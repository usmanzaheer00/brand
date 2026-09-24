# Sample catalogue. Later, replace this with a real database (PostgreSQL/SQLite).

def _images(seed: str, n: int = 4):
    # Placeholder photos. Swap with your own studio shots (URLs or /public paths).
    return [f"https://picsum.photos/seed/{seed}-{i}/900/1200" for i in range(n)]


PALETTE = {
    "Obsidian": "#121212",
    "Alabaster": "#E9E5DC",
    "Stone": "#B8B2A7",
    "Espresso": "#3B2F2A",
    "Indigo": "#2B3445",
}

SIZE_GUIDE = [
    {"size": "XS", "chest": 88, "waist": 70, "length": 98},
    {"size": "S", "chest": 94, "waist": 76, "length": 100},
    {"size": "M", "chest": 100, "waist": 82, "length": 102},
    {"size": "L", "chest": 106, "waist": 88, "length": 104},
    {"size": "XL", "chest": 112, "waist": 94, "length": 106},
]


def _p(id, name, gender, category, fit, price, material, colors, new=False):
    slug = name.lower().replace(" ", "-")
    return {
        "id": id,
        "slug": slug,
        "name": name,
        "gender": gender,
        "category": category,
        "fit": fit,
        "price": price,
        "material": material,
        "is_new": new,
        "colors": [{"name": c, "hex": PALETTE[c]} for c in colors],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "images": _images(slug),
        "description": (
            f"The {name.lower()} is cut in a {fit.lower()} silhouette from {material.lower()}. "
            "Architectural lines, considered proportions and a quiet finish."
        ),
        "composition": f"{material}. Lined with 100% cupro where applicable. Dry clean or cold gentle wash.",
        "fit_note": f"{fit} fit. Model is 6'1\" (185 cm) and wears size M.",
    }


PRODUCTS = [
    _p(1, "Tailored Wool Trouser", "women", "Trousers", "Straight", 189, "Italian wool blend", ["Obsidian", "Stone"], True),
    _p(2, "Oversized Poplin Shirt", "women", "Shirts", "Relaxed", 129, "Organic cotton poplin", ["Alabaster", "Indigo"], True),
    _p(3, "Sculpted Selvedge Denim", "women", "Denim", "Straight", 165, "Japanese selvedge denim", ["Indigo", "Obsidian"], True),
    _p(4, "Double-Breasted Wool Blazer", "women", "Outerwear", "Relaxed", 329, "Italian wool blend", ["Obsidian", "Espresso"], True),
    _p(5, "Ribbed Merino Knit", "women", "Knitwear", "Slim", 149, "Extra-fine merino wool", ["Alabaster", "Espresso"]),
    _p(6, "Pleated Wool Trouser", "men", "Trousers", "Relaxed", 199, "Italian wool blend", ["Obsidian", "Stone"], True),
    _p(7, "Structured Overshirt", "men", "Shirts", "Relaxed", 175, "Heavyweight organic cotton", ["Espresso", "Stone"], True),
    _p(8, "Straight-Leg Selvedge Jeans", "men", "Denim", "Straight", 169, "Japanese selvedge denim", ["Indigo", "Obsidian"]),
    _p(9, "Wool Overcoat", "men", "Outerwear", "Relaxed", 449, "Italian wool blend", ["Obsidian", "Espresso"]),
    _p(10, "Heavyweight Cotton Tee", "men", "Essentials", "Slim", 59, "Organic combed cotton", ["Alabaster", "Obsidian"]),
    _p(11, "Wide-Leg Linen Trouser", "women", "Trousers", "Relaxed", 139, "European linen", ["Stone", "Alabaster"]),
    _p(12, "Fine-Gauge Polo Knit", "men", "Knitwear", "Slim", 119, "Extra-fine merino wool", ["Alabaster", "Indigo"]),
]