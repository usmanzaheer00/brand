from itertools import count
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from data import PRODUCTS, SIZE_GUIDE

app = FastAPI(title="Atelier 09 API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://frontend-eta-ruby-68.vercel.app",
    ],
    allow_origin_regex=r"https://frontend.*\.vercel\.app",
    allow_methods=["*"],
    allow_headers=["*"],
)

SUBSCRIBERS: set[str] = set()
ORDERS: list[dict] = []
_order_ids = count(1001)

FREE_SHIPPING_OVER = 150
FLAT_SHIPPING = 12


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/filters")
def filters():
    return {
        "categories": sorted({p["category"] for p in PRODUCTS}),
        "fits": sorted({p["fit"] for p in PRODUCTS}),
        "sizes": ["XS", "S", "M", "L", "XL"],
    }


@app.get("/api/products")
def list_products(
    gender: Optional[str] = None,
    category: Optional[str] = None,
    fit: Optional[str] = None,
    size: Optional[str] = None,
    q: Optional[str] = None,
    new: bool = False,
    sort: str = "featured",
    limit: int = 100,
    offset: int = 0,
):
    items = PRODUCTS
    if gender:
        items = [p for p in items if p["gender"] == gender]
    if category:
        items = [p for p in items if p["category"] == category]
    if fit:
        items = [p for p in items if p["fit"] == fit]
    if size:
        items = [p for p in items if size in p["sizes"]]
    if new:
        items = [p for p in items if p["is_new"]]
    if q:
        needle = q.lower()
        items = [
            p for p in items
            if needle in f'{p["name"]} {p["material"]} {p["category"]}'.lower()
        ]

    if sort == "price_asc":
        items = sorted(items, key=lambda p: p["price"])
    elif sort == "price_desc":
        items = sorted(items, key=lambda p: p["price"], reverse=True)
    elif sort == "newest":
        items = sorted(items, key=lambda p: not p["is_new"])

    return {"total": len(items), "items": items[offset : offset + limit]}


@app.get("/api/products/{slug}")
def get_product(slug: str):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return {**p, "size_guide": SIZE_GUIDE}
    raise HTTPException(status_code=404, detail="Product not found")


class NewsletterIn(BaseModel):
    email: EmailStr


@app.post("/api/newsletter")
def newsletter(body: NewsletterIn):
    SUBSCRIBERS.add(body.email.lower())
    return {"message": "Welcome. You're on the private list."}


class OrderItem(BaseModel):
    product_id: int
    size: str
    color: str
    qty: int = Field(ge=1, le=20)


class OrderIn(BaseModel):
    items: list[OrderItem] = Field(min_length=1)


@app.post("/api/orders")
def create_order(body: OrderIn):
    # Prices are always calculated on the server, never trusted from the browser.
    lookup = {p["id"]: p for p in PRODUCTS}
    subtotal = 0
    for item in body.items:
        product = lookup.get(item.product_id)
        if not product:
            raise HTTPException(status_code=400, detail=f"Unknown product {item.product_id}")
        subtotal += product["price"] * item.qty

    shipping = 0 if subtotal >= FREE_SHIPPING_OVER else FLAT_SHIPPING
    order = {
        "order_id": next(_order_ids),
        "subtotal": subtotal,
        "shipping": shipping,
        "total": subtotal + shipping,
        "items": [i.model_dump() for i in body.items],
    }
    ORDERS.append(order)
    return order
