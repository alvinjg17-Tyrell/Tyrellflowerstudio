from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import shutil

ROOT_DIR = Path(__file__).parent
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
app.mount("/api/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")
api_router = APIRouter(prefix="/api")

# ─── Models ───────────────────────────────────────────────

class Feature(BaseModel):
    title: str = ""
    description: str = ""
    icon: str = "Flower2"

class BrandContent(BaseModel):
    name: str = "TYRELL"
    tagline: str = ""
    description: str = ""
    catalogUrl: str = ""
    whatsappLink: str = ""
    location: str = ""
    locationUrl: str = ""
    whatsappNumber: str = ""

class HeroContent(BaseModel):
    label: str = "Flower Studio"
    title: str = ""
    titleHighlight: str = ""
    subtitle: str = ""
    ctaText: str = "Ver Catálogo"
    ctaSecondaryText: str = "Nuestros Servicios"
    image: str = ""
    video: str = ""
    useVideo: bool = False

class AboutContent(BaseModel):
    label: str = "Conócenos"
    title: str = ""
    subtitle: str = ""
    description: str = ""
    badgeNumber: str = "+2000"
    badgeLabel: str = "Arreglos Entregados"
    features: List[Feature] = []
    image: str = ""

class ServicesContent(BaseModel):
    label: str = "Nuestros Servicios"
    title: str = "Creaciones para cada"
    titleHighlight: str = "momento"
    subtitle: str = "Descubre nuestra colección de arreglos florales y servicios diseñados para sorprender."

class ContactContent(BaseModel):
    title: str = ""
    subtitle: str = ""
    address: str = ""
    whatsappLabel: str = ""
    scheduleTitle: str = ""
    schedule: str = ""
    scheduleWeekend: str = ""

class SiteContent(BaseModel):
    brand: BrandContent = BrandContent()
    hero: HeroContent = HeroContent()
    about: AboutContent = AboutContent()
    services: ServicesContent = ServicesContent()
    contact: ContactContent = ContactContent()

class ServiceCreate(BaseModel):
    title: str
    description: str = ""
    image: str = ""
    images: List[str] = []
    tag: str = ""
    price: str = ""
    order: int = 0

class ServiceResponse(BaseModel):
    id: str
    title: str
    description: str
    image: str
    images: List[str] = []
    tag: str
    price: str
    order: int
    created_at: datetime

class CatalogLinkCreate(BaseModel):
    title: str
    url: str
    order: int = 0

class CatalogLinkResponse(BaseModel):
    id: str
    title: str
    url: str
    order: int
    created_at: datetime

# ─── Default seed data ────────────────────────────────────

DEFAULT_SITE = {
    "brand": {
        "name": "TYRELL",
        "tagline": "Donde cada pétalo cuenta una historia de amor",
        "description": "En TYRELL, transformamos flores frescas en obras de arte que transmiten emociones.",
        "catalogUrl": "https://heyzine.com/flip-book/9c9575825d.html#page/14",
        "whatsappLink": "https://wa.me/51910770284",
        "location": "Jirón Pedro Pascasio Noriega, Moyobamba, Perú",
        "locationUrl": "https://www.google.com/maps/search/Jir%C3%B3n+Pedro+Pascasio+Noriega,+Moyobamba,+Per%C3%BA/@-6.0289855,-76.9782139,15.93z?hl=es&entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D",
        "whatsappNumber": "+51 910 770 284",
    },
    "hero": {
        "label": "Flower Studio",
        "title": "Flores pɑrɑ quienes",
        "titleHighlight": "ɑmɑn lo extrɑordinɑrio.",
        "subtitle": "Arreglos florales exclusivos que expresan tus sentimientos más profundos. Calidad premium, creatividad sin límites y entrega puntual.",
        "ctaText": "Ver Catálogo",
        "ctaSecondaryText": "Nuestros Servicios",
        "image": "https://images.unsplash.com/photo-1706064955769-2e6208cb1671?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
        "video": "https://customer-assets.emergentagent.com/job_tyrell-floreria/artifacts/wbf3py5n_IMG_3174.MOV",
        "useVideo": True,
    },
    "about": {
        "label": "Conócenos",
        "title": "Nuestra Esencia",
        "subtitle": "Más que flores, creamos momentos",
        "description": "En TYRELL nos apasiona el arte floral. Cada arreglo es diseñado con esmero, seleccionando las flores más frescas y combinándolas con creatividad para crear piezas únicas que transmiten emociones genuinas.",
        "badgeNumber": "+2000",
        "badgeLabel": "Arreglos Entregados",
        "features": [
            {"title": "Flores Frescas", "description": "Seleccionamos las mejores flores cada día para garantizar frescura y durabilidad en cada arreglo.", "icon": "Flower2"},
            {"title": "Diseño Exclusivo", "description": "Cada creación es única, diseñada con pasión y atención al detalle para sorprender.", "icon": "Sparkles"},
            {"title": "Entrega Puntual", "description": "Tu pedido llegará en el momento perfecto, porque cada segundo cuenta cuando se trata de emociones.", "icon": "Clock"},
        ],
        "image": "https://images.unsplash.com/photo-1584515453937-c00929e621d1?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    "services": {
        "label": "Nuestros Servicios",
        "title": "Creaciones para cada",
        "titleHighlight": "momento",
        "subtitle": "Descubre nuestra colección de arreglos florales y servicios diseñados para sorprender.",
    },
    "contact": {
        "title": "Contáctanos",
        "subtitle": "Estamos aquí para hacer realidad tu visión floral",
        "address": "Jirón Pedro Pascasio Noriega, Moyobamba, Perú",
        "whatsappLabel": "Escríbenos por WhatsApp",
        "scheduleTitle": "Horario de Atención",
        "schedule": "Lunes a Sábado: 8:00 AM - 7:00 PM",
        "scheduleWeekend": "Domingos: 9:00 AM - 2:00 PM",
    },
}

DEFAULT_SERVICES = [
    {"id": str(uuid.uuid4()), "title": "Arreglos Florales", "description": "Composiciones artísticas con las flores más selectas, perfectas para decorar cualquier espacio con elegancia y distinción.", "image": "https://images.unsplash.com/photo-1487530811176-3780de880c2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=600", "tag": "Popular", "price": "", "order": 0, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "title": "Ramos Personalizados", "description": "Diseñamos ramos a tu medida, eligiendo colores, flores y estilos que reflejen tu mensaje personal.", "image": "https://images.unsplash.com/photo-1705807088510-02da367dcda8?crop=entropy&cs=srgb&fm=jpg&q=85&w=600", "tag": "Exclusivo", "price": "", "order": 1, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "title": "Regalos Especiales", "description": "Complementa tus flores con detalles únicos: chocolates, peluches y accesorios para crear el regalo perfecto.", "image": "https://images.unsplash.com/photo-1618239265038-9e4c865fbd10?crop=entropy&cs=srgb&fm=jpg&q=85&w=600", "tag": "Nuevo", "price": "", "order": 2, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "title": "Eventos & Bodas", "description": "Decoración floral completa para bodas, quinceañeros, aniversarios y todo tipo de celebraciones especiales.", "image": "https://images.unsplash.com/photo-1551468220-0a25172193f9?crop=entropy&cs=srgb&fm=jpg&q=85&w=600", "tag": "Premium", "price": "", "order": 3, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "title": "Tulipanes Elegantes", "description": "Hermosos arreglos con tulipanes importados, símbolo de amor perfecto y elegancia atemporal.", "image": "https://images.unsplash.com/photo-1613386080939-170e1e833f70?crop=entropy&cs=srgb&fm=jpg&q=85&w=600", "tag": "Temporada", "price": "", "order": 4, "created_at": datetime.utcnow()},
]

DEFAULT_CATALOG_LINKS = [
    {"id": str(uuid.uuid4()), "title": "Catálogo Principal", "url": "https://heyzine.com/flip-book/9c9575825d.html#page/14", "order": 0, "created_at": datetime.utcnow()},
]

# ─── Seed helper ──────────────────────────────────────────

async def seed_data():
    existing = await db.site_content.find_one()
    if not existing:
        await db.site_content.insert_one(DEFAULT_SITE)
        logger.info("Seeded site_content")
    else:
        # Ensure new fields exist
        update_fields = {}
        if "services" not in existing:
            update_fields["services"] = DEFAULT_SITE["services"]
        if "locationUrl" not in existing.get("brand", {}):
            update_fields["brand.locationUrl"] = DEFAULT_SITE["brand"]["locationUrl"]
        if "label" not in existing.get("hero", {}):
            update_fields["hero.label"] = DEFAULT_SITE["hero"]["label"]
        if "label" not in existing.get("about", {}):
            update_fields["about.label"] = DEFAULT_SITE["about"]["label"]
            update_fields["about.badgeNumber"] = DEFAULT_SITE["about"]["badgeNumber"]
            update_fields["about.badgeLabel"] = DEFAULT_SITE["about"]["badgeLabel"]
        if update_fields:
            await db.site_content.update_one({}, {"$set": update_fields})
            logger.info("Updated site_content with new fields")

    svc_count = await db.services.count_documents({})
    if svc_count == 0:
        await db.services.insert_many(DEFAULT_SERVICES)
        logger.info("Seeded services")

    cat_count = await db.catalog_links.count_documents({})
    if cat_count == 0:
        await db.catalog_links.insert_many(DEFAULT_CATALOG_LINKS)
        logger.info("Seeded catalog_links")

# ─── Routes ───────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "TYRELL API running"}

# ─── File Upload ──────────────────────────────────────────

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".mov"]:
        raise HTTPException(status_code=400, detail="Formato no soportado")
    
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = UPLOADS_DIR / filename
    
    with open(filepath, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Return the URL path that can be used to access the file
    return {"url": f"/api/uploads/{filename}", "filename": filename}

@api_router.get("/content")
async def get_all_content():
    site = await db.site_content.find_one()
    if site:
        site.pop("_id", None)
    else:
        site = DEFAULT_SITE

    services = []
    async for svc in db.services.find().sort("order", 1):
        svc.pop("_id", None)
        services.append(svc)

    catalog_links = []
    async for cl in db.catalog_links.find().sort("order", 1):
        cl.pop("_id", None)
        catalog_links.append(cl)

    return {"site": site, "services": services, "catalogLinks": catalog_links}

@api_router.put("/content")
async def update_site_content(content: SiteContent):
    content_dict = content.dict()
    await db.site_content.update_one({}, {"$set": content_dict}, upsert=True)
    return {"message": "Contenido actualizado", "data": content_dict}

# ─── Services CRUD ────────────────────────────────────────

@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    services = []
    async for svc in db.services.find().sort("order", 1):
        svc.pop("_id", None)
        services.append(ServiceResponse(**svc))
    return services

@api_router.post("/services", response_model=ServiceResponse)
async def create_service(service: ServiceCreate):
    svc_dict = service.dict()
    svc_dict["id"] = str(uuid.uuid4())
    svc_dict["created_at"] = datetime.utcnow()
    await db.services.insert_one(svc_dict)
    return ServiceResponse(**svc_dict)

@api_router.put("/services/{service_id}", response_model=ServiceResponse)
async def update_service(service_id: str, service: ServiceCreate):
    result = await db.services.find_one({"id": service_id})
    if not result:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    await db.services.update_one({"id": service_id}, {"$set": service.dict()})
    updated = await db.services.find_one({"id": service_id})
    updated.pop("_id", None)
    return ServiceResponse(**updated)

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return {"message": "Servicio eliminado"}

# ─── Catalog Links CRUD ──────────────────────────────────

@api_router.get("/catalog-links", response_model=List[CatalogLinkResponse])
async def get_catalog_links():
    links = []
    async for cl in db.catalog_links.find().sort("order", 1):
        cl.pop("_id", None)
        links.append(CatalogLinkResponse(**cl))
    return links

@api_router.post("/catalog-links", response_model=CatalogLinkResponse)
async def create_catalog_link(link: CatalogLinkCreate):
    link_dict = link.dict()
    link_dict["id"] = str(uuid.uuid4())
    link_dict["created_at"] = datetime.utcnow()
    await db.catalog_links.insert_one(link_dict)
    return CatalogLinkResponse(**link_dict)

@api_router.put("/catalog-links/{link_id}", response_model=CatalogLinkResponse)
async def update_catalog_link(link_id: str, link: CatalogLinkCreate):
    result = await db.catalog_links.find_one({"id": link_id})
    if not result:
        raise HTTPException(status_code=404, detail="Enlace no encontrado")
    await db.catalog_links.update_one({"id": link_id}, {"$set": link.dict()})
    updated = await db.catalog_links.find_one({"id": link_id})
    updated.pop("_id", None)
    return CatalogLinkResponse(**updated)

@api_router.delete("/catalog-links/{link_id}")
async def delete_catalog_link(link_id: str):
    result = await db.catalog_links.delete_one({"id": link_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enlace no encontrado")
    return {"message": "Enlace eliminado"}

# ─── App setup ────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await seed_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
