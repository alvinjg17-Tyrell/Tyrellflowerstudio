from fastapi import FastAPI, APIRouter, HTTPException
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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
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
    whatsappNumber: str = ""

class HeroContent(BaseModel):
    title: str = ""
    titleHighlight: str = ""
    subtitle: str = ""
    ctaText: str = "Ver Catálogo"
    image: str = ""

class AboutContent(BaseModel):
    title: str = ""
    subtitle: str = ""
    description: str = ""
    features: List[Feature] = []
    image: str = ""

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
    contact: ContactContent = ContactContent()

class ServiceCreate(BaseModel):
    title: str
    description: str = ""
    image: str = ""
    tag: str = ""
    price: str = ""
    order: int = 0

class ServiceResponse(BaseModel):
    id: str
    title: str
    description: str
    image: str
    tag: str
    price: str
    order: int
    created_at: datetime

class TestimonialCreate(BaseModel):
    name: str
    text: str
    rating: int = 5

class TestimonialResponse(BaseModel):
    id: str
    name: str
    text: str
    rating: int
    created_at: datetime

class AllContentResponse(BaseModel):
    site: SiteContent
    services: List[ServiceResponse]
    testimonials: List[TestimonialResponse]

# ─── Default seed data ────────────────────────────────────

DEFAULT_SITE = {
    "brand": {
        "name": "TYRELL",
        "tagline": "Donde cada pétalo cuenta una historia de amor",
        "description": "En TYRELL, transformamos flores frescas en obras de arte que transmiten emociones. Con dedicación artesanal y los arreglos más exclusivos de Moyobamba, creamos experiencias inolvidables para cada momento especial de tu vida.",
        "catalogUrl": "https://heyzine.com/flip-book/9c9575825d.html#page/14",
        "whatsappLink": "https://wa.me/51910770284",
        "location": "Moyobamba, San Martín, Perú",
        "whatsappNumber": "+51 910 770 284",
    },
    "hero": {
        "title": "Elegancia en",
        "titleHighlight": "cada flor",
        "subtitle": "Arreglos florales exclusivos que expresan tus sentimientos más profundos. Calidad premium, creatividad sin límites y entrega puntual.",
        "ctaText": "Ver Catálogo",
        "image": "https://images.unsplash.com/photo-1706064955769-2e6208cb1671?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    "about": {
        "title": "Nuestra Esencia",
        "subtitle": "Más que flores, creamos momentos",
        "description": "En TYRELL nos apasiona el arte floral. Cada arreglo es diseñado con esmero, seleccionando las flores más frescas y combinándolas con creatividad para crear piezas únicas que transmiten emociones genuinas.",
        "features": [
            {"title": "Flores Frescas", "description": "Seleccionamos las mejores flores cada día para garantizar frescura y durabilidad en cada arreglo.", "icon": "Flower2"},
            {"title": "Diseño Exclusivo", "description": "Cada creación es única, diseñada con pasión y atención al detalle para sorprender.", "icon": "Sparkles"},
            {"title": "Entrega Puntual", "description": "Tu pedido llegará en el momento perfecto, porque cada segundo cuenta cuando se trata de emociones.", "icon": "Clock"},
        ],
        "image": "https://images.unsplash.com/photo-1584515453937-c00929e621d1?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    "contact": {
        "title": "Contáctanos",
        "subtitle": "Estamos aquí para hacer realidad tu visión floral",
        "address": "Moyobamba, San Martín, Perú",
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

DEFAULT_TESTIMONIALS = [
    {"id": str(uuid.uuid4()), "name": "María García", "text": "Los arreglos de TYRELL son simplemente hermosos. Siempre llegan frescos y puntuales. ¡Mi florería favorita!", "rating": 5, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "name": "Carlos Mendoza", "text": "Sorprendí a mi esposa con un ramo personalizado y quedó encantada. La calidad y el detalle son excepcionales.", "rating": 5, "created_at": datetime.utcnow()},
    {"id": str(uuid.uuid4()), "name": "Ana Lucía Torres", "text": "La decoración floral de mi boda fue un sueño hecho realidad. El equipo de TYRELL superó todas mis expectativas.", "rating": 5, "created_at": datetime.utcnow()},
]

# ─── Seed helper ──────────────────────────────────────────

async def seed_data():
    existing = await db.site_content.find_one()
    if not existing:
        await db.site_content.insert_one(DEFAULT_SITE)
        logger.info("Seeded site_content")
    svc_count = await db.services.count_documents({})
    if svc_count == 0:
        await db.services.insert_many(DEFAULT_SERVICES)
        logger.info("Seeded services")
    test_count = await db.testimonials.count_documents({})
    if test_count == 0:
        await db.testimonials.insert_many(DEFAULT_TESTIMONIALS)
        logger.info("Seeded testimonials")

# ─── Routes ───────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "TYRELL API running"}

# Get ALL content for landing page
@api_router.get("/content")
async def get_all_content():
    site = await db.site_content.find_one()
    if site:
        site.pop("_id", None)
    else:
        site = DEFAULT_SITE

    services_cursor = db.services.find().sort("order", 1)
    services = []
    async for svc in services_cursor:
        svc.pop("_id", None)
        services.append(svc)

    testimonials_cursor = db.testimonials.find().sort("created_at", -1)
    testimonials = []
    async for t in testimonials_cursor:
        t.pop("_id", None)
        testimonials.append(t)

    return {"site": site, "services": services, "testimonials": testimonials}

# Update site content
@api_router.put("/content")
async def update_site_content(content: SiteContent):
    content_dict = content.dict()
    await db.site_content.update_one({}, {"$set": content_dict}, upsert=True)
    return {"message": "Contenido actualizado", "data": content_dict}

# ─── Services CRUD ────────────────────────────────────────

@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    cursor = db.services.find().sort("order", 1)
    services = []
    async for svc in cursor:
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
    update_data = service.dict()
    await db.services.update_one({"id": service_id}, {"$set": update_data})
    updated = await db.services.find_one({"id": service_id})
    updated.pop("_id", None)
    return ServiceResponse(**updated)

@api_router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return {"message": "Servicio eliminado"}

# ─── Testimonials CRUD ────────────────────────────────────

@api_router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials():
    cursor = db.testimonials.find().sort("created_at", -1)
    testimonials = []
    async for t in cursor:
        t.pop("_id", None)
        testimonials.append(TestimonialResponse(**t))
    return testimonials

@api_router.post("/testimonials", response_model=TestimonialResponse)
async def create_testimonial(testimonial: TestimonialCreate):
    t_dict = testimonial.dict()
    t_dict["id"] = str(uuid.uuid4())
    t_dict["created_at"] = datetime.utcnow()
    await db.testimonials.insert_one(t_dict)
    return TestimonialResponse(**t_dict)

@api_router.put("/testimonials/{testimonial_id}", response_model=TestimonialResponse)
async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate):
    result = await db.testimonials.find_one({"id": testimonial_id})
    if not result:
        raise HTTPException(status_code=404, detail="Testimonio no encontrado")
    update_data = testimonial.dict()
    await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_data})
    updated = await db.testimonials.find_one({"id": testimonial_id})
    updated.pop("_id", None)
    return TestimonialResponse(**updated)

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonio no encontrado")
    return {"message": "Testimonio eliminado"}

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
