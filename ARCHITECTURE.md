# Arquitectura frontend — moda y calzado

## Base

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui con Base UI y preset Nova. El `app/` existente se mantiene en la raíz; los componentes shadcn viven en `components/ui/`. El dominio y datos viven en `src/`.

El catálogo usa JSON locales detrás de servicios. Las páginas de lectura son Server Components; los controles interactivos se aíslan en componentes Client. `ShopProvider` persiste carrito y favoritos en `localStorage`, sin backend, autenticación ni pagos reales.

## Rutas

| Ruta | Propósito |
| --- | --- |
| `/` | Portada editorial, categorías, lanzamientos y selecciones |
| `/productos` | Catálogo con búsqueda, filtros, orden y paginación |
| `/productos/[slug]` | Ficha, galería, color, talla y guía de tallas |
| `/hombre`, `/mujer` | Catálogo por género, incluyendo Unisex |
| `/calzado`, `/ropa` | Catálogo por departamento |
| `/nuevos`, `/ofertas` | Listados dinámicos desde productos JSON |
| `/favoritos`, `/carrito` | Listas persistentes del usuario |
| `/checkout` | Formulario y pago simulado |
| `/login`, `/register`, `/perfil`, `/perfil/pedidos` | Interfaces de cuenta y pedidos de muestra |

## Módulos y datos

- `src/data`: productos, categorías de moda/calzado, colecciones, banners, usuarios y órdenes.
- `src/types`: producto, talla, color, género, departamento, colección, carrito y orden.
- `src/services`: búsqueda local, selección por categoría/género/departamento/colección y recomendaciones relacionadas.
- `components/layout`: barra de anuncio, navbar, menú móvil y footer.
- `components/home`: composición editorial y selecciones distintas por sección.
- `src/components/products`: tarjeta, grid, filtros, ficha y selectores de variantes.
- `src/components/store`: bolsa, favoritos y checkout simulado.
- `src/components/layout`: navegación principal con `NavigationMenu`, menú móvil y búsqueda global con `Command`/`Dialog`.
- `src/store`: estado local persistente de carrito y favoritos.

Los productos contienen categoría, género, colección, imágenes, colores con valor visual y tallas con disponibilidad. Las categorías quedan limitadas a ropa y calzado. Las cantidades y combinaciones de talla/color se modelan en cada línea de carrito.

## Componentes por tipo

**Server Components:** portada, lecturas del catálogo, género/departamento, detalle, metadata, perfil de muestra y pedidos. Las rutas de producto usarán `generateStaticParams()`, `generateMetadata()` y `notFound()`.

**Client Components:** búsqueda y debounce, filtros, orden, Sheet de filtros móvil, selección de talla/color/cantidad, favoritos, bolsa, menú móvil, guía de tallas, checkout simulado y toasts.

La búsqueda y los filtros se reflejan en la URL. Los segmentos de catálogo y ficha tienen `loading.tsx` con skeletons. Sonner notifica las acciones de compra. Los formularios y los pagos son de demostración.

## Componentes shadcn previstos

Se reutilizan `Accordion`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Checkbox`, `Command`, `Dialog`, `DropdownMenu`, `Input`, `NavigationMenu`, `Pagination`, `RadioGroup`, `ScrollArea`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Sonner`, `ToggleGroup` y `Tooltip` del preset Nova/Base UI.

## Entrega incremental

1. Tipos, catálogo de moda en JSON y servicios locales.
2. Navegación, home editorial y tarjetas de producto.
3. Catálogo, búsqueda y filtros responsive.
4. Ficha, galería y variantes.
5. Carrito y favoritos con persistencia.
6. Checkout simulado y cuenta de muestra.
