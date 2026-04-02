export type Language = "en" | "es";

export const translations = {
    en: {
        meta: {
            title: "Joseph Cuartas — Frontend Developer",
            description: "Frontend developer building interfaces for real-time workflows. Currently at VideFace.",
        },
        common: {
            languageLabels: {
                en: "EN",
                es: "ES",
            },
            languageAria: {
                en: "Switch page language to English",
                es: "Switch page language to Spanish",
            },
            social: {
                github: "GitHub",
                email: "Email",
                linkedin: "LinkedIn",
            },
            actions: {
                contact: "Contact",
                whatsapp: "WhatsApp",
                resume: "Download CV",
                copyEmail: "Copy email",
                copiedEmail: "Email copied",
            },
            copyEmailAria: "Copy email address",
            theme: {
                toLight: "Switch to light mode",
                toDark: "Switch to dark mode",
            },
        },
        nav: {
            about: "About",
            experience: "Experience",
            projects: "Projects",
            principles: "Principles",
            stack: "Stack",
            contact: "Contact",
            openMenu: "Open menu",
            closeMenu: "Close menu",
        },
        hero: {
            availability: "Available for opportunities",
            role: "Frontend Developer",
            companyBadge: "VideFace · 2025–Present",
            systemsLabel: "Real-time scheduling · Field workflows · Tenant isolation",
            summary:
                "I'm a frontend developer building interfaces for scheduling, field operations, and message-based workflows. I focus on making key actions feel clear and responsive under latency, unstable connectivity, and tenant constraints, then improving them through testing, observation, and iteration.",
            caseStudiesLabel: "Selected case studies",
            caseStudies: [
                {
                    type: "Case study",
                    title: "VideFace scheduling under real-time sync constraints",
                    summary:
                        "Scheduling UI for admins and agents, with immediate feedback, sync states, and safer recovery paths.",
                    readTime: "6 min read",
                    href: "#videface-case",
                },
                {
                    type: "Featured",
                    title: "WhatsMyTask extraction pipeline",
                    summary:
                        "Filtering and batching WhatsApp bursts before Gemini to reduce cost and improve task coherence.",
                    readTime: "8 min read",
                    href: "#projects",
                },
                {
                    type: "Case study",
                    title: "Dragonfly offline-first field tracking",
                    summary:
                        "Route tracking for 300 users and 7 trucks, with live location, order assignment, and offline-safe capture.",
                    readTime: "5 min read",
                    href: "#dragonfly-case",
                },
            ],
            caseStudiesCta: "View case",
            proofPoints: [
                "operators using field water-distribution workflows",
                "tracking updates kept under one second in live monitoring",
                "LLM calls removed through batched WhatsApp extraction",
            ],
        },
        experience: {
            title: "Experience",
            current: "Current",
            labels: {
                context: "Context",
                constraints: "Constraints",
                role: "Role",
                decisions: "Key decisions",
                alternative: "Alternative discarded",
                validation: "Validation",
                tradeoff: "Trade-off",
            },
            jobs: [
                {
                    id: "videface-case",
                    caseType: "Case study",
                    readTime: "6 min read",
                    company: "VideFace",
                    role: "Frontend Engineer",
                    period: "2025 — Present",
                    current: true,
                    stack: ["React", "Firestore", "Realtime Database", "Tailwind", "Electron"],
                    roleScope:
                        "Worked on interaction design and implementation for scheduling flows, sync feedback, and recovery states.",
                    context:
                        "Built and improved the scheduling interface used by admins, agents, and end users to coordinate operational tools and field workflows in real time.",
                    constraints: [
                        "Network latency and unstable hardware in the field could not block daily operational flows.",
                        "Tenant data had to stay isolated and secure under shared infrastructure.",
                    ],
                    achievements: [
                        "Improved the operational dashboard with Realtime Database sync so admins and agents could see assignment and status changes without reloading.",
                        "Added activity monitoring and traceability tools for the vehicle rental flow so the admin side was easier to follow from the interface.",
                    ],
                    validation:
                        "Observed in real user tests: optimistic confirmation reduced perceived latency and made actions feel immediate even under unstable signal.",
                    tradeoff:
                        "Accepted more reconciliation logic so users would not get blocked by loading states during active operations.",
                    decisions: [
                        {
                            title: "Used optimistic feedback for scheduling actions",
                            rationale:
                                "Admins and agents needed the interface to respond immediately during scheduling, so waiting for server confirmation made the workflow feel slower than the task itself.",
                            alternative:
                                "Discarded confirmation-first updates because they kept users blocked by network latency on every change.",
                        },
                        {
                            title: "Scoped UI behavior by tenant",
                            rationale:
                                "Some flows and visual states changed by company, so the interface needed to adapt without mixing behavior or data between tenants.",
                            alternative:
                                "Discarded a single shared flow for every tenant because it simplified setup but weakened isolation and flexibility.",
                        },
                    ],
                },
                {
                    id: "dragonfly-case",
                    caseType: "Case study",
                    readTime: "5 min read",
                    company: "Dragonfly",
                    subtitle: "Water delivery logistics",
                    role: "Frontend Engineer",
                    period: "2023 — 2025",
                    current: false,
                    stack: ["React Native", "Firebase", "Realtime Database", "Maps"],
                    roleScope:
                        "Built the mobile interface for field tracking, live route visibility, and delivery assignment.",
                    context:
                        "Built the app used to track driver location in real time, assign orders, and register deliveries across a water-distribution operation with roughly 300 users and 7 trucks.",
                    constraints: [
                        "The interface had to stay easy to understand during active route coordination.",
                        "Live location and delivery updates needed to feel immediate on unstable mobile connections.",
                        "Delivery capture could not fail when drivers lost signal in the field.",
                    ],
                    achievements: [
                        "Built the main app experience used by around 300 users across 7 trucks in daily water-distribution routes.",
                        "Implemented real-time views for driver location, delivery progress, and order assignment so coordinators could follow operations from the frontend.",
                        "Kept the interface usable under weak signal by combining offline capture with later synchronization.",
                        "Improved the client update path so tracking feedback stayed under one second during active use.",
                    ],
                    validation: "Observed in field usage and internal tests on low-connectivity mobile devices.",
                    tradeoff:
                        "Accepted more client-side sync handling so route work could continue without depending on stable signal.",
                    decisions: [
                        {
                            title: "Handled delivery capture offline first",
                            rationale:
                                "Drivers and operators could not depend on stable connectivity while registering deliveries and route updates.",
                            alternative:
                                "Discarded connection-dependent writes because they made route progress unreliable in the field.",
                        },
                        {
                            title: "Prioritized a clear route UI on mobile",
                            rationale:
                                "Operators needed to understand location, order status, and assigned deliveries quickly from the phone screen during active routes.",
                            alternative:
                                "Discarded denser screens because they made route coordination slower and harder to scan.",
                        },
                    ],
                },
            ],
        },
        projects: {
            sectionLabel: "Featured Project",
            description: "Task extraction pipeline for WhatsApp Business conversations using Gemini API.",
            status: "Independent Case Study",
            readTime: "8 min read",
            roleTitle: "Role",
            role: "Personal case study focused on frontend and product thinking. I defined the pipeline, filtering rules, buffering logic, and the interaction model used to inspect trade-offs during testing.",
            relatedWorkTitle: "Production work shipped at VideFace",
            relatedWorkIntro:
                "This independent case study sits next to frontend systems I already shipped in production at VideFace.",
            relatedWorkGroups: [
                {
                    title: "Video call system / Agents",
                    items: [
                        "Automatic call recording with role-based control for dev, agent, and admin.",
                        "Camera and microphone error detection with informative popups.",
                        "Automatic fallback to the next available device if the selected one fails.",
                        "Agent-side control over the customer device state.",
                        "Video upload status indicators and timestamps in the UI.",
                        "Refresh button with debouncer for recorded videos.",
                        "Video downloads named by date.",
                    ],
                },
                {
                    title: "Contracts module",
                    items: [
                        "Return data and key-delivery data displayed in contract tabs.",
                        "Saved return walkaround and locker video into the rental cycle.",
                        "Date range filters for recorded videos.",
                        "Integrated contractId into key release and email flows.",
                        "Agent review tab for vehicle reports.",
                    ],
                },
                {
                    title: "Damage reports",
                    items: [
                        "Damage report screen for carwashers.",
                        "Replaced the damage carousel with a thumbnail strip plus delete from popup.",
                        "Integrated the damage-report module into vehicle preview.",
                        "Added an agent review tab for damage reports.",
                    ],
                },
                {
                    title: "Videos / Clips system",
                    items: [
                        "Automatic deletion of clips older than 7 days.",
                        "Clip type indicator in the UI.",
                        "Recording filters by agent, where agents see their own recordings and admins see all.",
                    ],
                },
                {
                    title: "Kiosk / Touch screen",
                    items: [
                        "Touch screen flow for Amerirent (AmerirentTouch).",
                        "Property carousel with image editor.",
                        "Touch prompt with branded header, call to action, and footer.",
                        "Terms and Conditions dialog with configurable toggle.",
                        "Disabled timer on mobile view.",
                        "Fixed kiosk camera loop issue.",
                    ],
                },
            ],
            scopeTitle: "Scope",
            scope: "Case study focused on reducing unnecessary model usage while making extraction behavior easier to explain and tune.",
            alternativeLabel: "Alternative discarded",
            problemTitle: "Problem",
            problem:
                "WhatsApp conversations arrived as fragmented bursts, and treating each message as an isolated Gemini call produced unnecessary cost and inconsistent task extraction.",
            keyDecisionsTitle: "Key decisions",
            decisions: [
                {
                    title: "Filtered traffic before Gemini",
                    rationale:
                        "Validity, authority, and intent checks were cheaper to evaluate than paying for the model to inspect every message.",
                    alternative:
                        "Discarded per-message model classification because it increased cost while still leaving noisy traffic in the flow.",
                },
                {
                    title: "Buffered bursts into a 60-second window",
                    rationale:
                        "Grouped bursts produced more coherent task payloads than immediate extraction from fragmented message snapshots.",
                    alternative:
                        "Discarded immediate extraction because it emitted partial or duplicated tasks when users sent messages in short bursts.",
                },
                {
                    title: "Kept the pipeline explicit instead of opaque",
                    rationale:
                        "A staged flow made false positives, delays, and tuning decisions inspectable during testing.",
                    alternative:
                        "Discarded a single end-to-end model call because it was harder to debug and harder to defend when behavior changed.",
                },
            ],
            solutionTitle: "System design",
            interactionHint: "Hover or focus a stage to inspect why it exists in the pipeline.",
            pipeline: [
                { step: "01", title: "Inbound", detail: "capture raw traffic before any filtering or batching" },
                {
                    step: "02",
                    title: "Filter",
                    detail: "remove invalid, unauthorized, and low-intent messages before model usage",
                },
                { step: "03", title: "Buffer", detail: "group related bursts into a 60s shared context window" },
                { step: "04", title: "Extract", detail: "send only actionable grouped context to Gemini" },
            ],
            stageCards: {
                inbound: {
                    eyebrow: "Raw intake",
                    title: "Start with full traffic",
                    description:
                        "The pipeline starts with unprocessed WhatsApp traffic rather than early model classification so every later reduction stays explicit, measurable, and debuggable.",
                    related: "Connected to the 4-stage pipeline metric.",
                },
                filter: {
                    eyebrow: "Cost gate",
                    title: "Filter before the model",
                    description:
                        "Validity, authority, and intent checks block empty, unauthorized, and non-actionable messages before any Gemini call is made, instead of paying to classify every message downstream.",
                    related: "This stage drives the ~90% API reduction.",
                },
                buffer: {
                    eyebrow: "Context quality",
                    title: "Group related bursts",
                    description:
                        "A 60-second window merges fragmented bursts into one extraction context instead of making decisions from isolated message snapshots as they arrive.",
                    related: "This stage produces the 60s context buffer.",
                },
                extract: {
                    eyebrow: "Controlled boundary",
                    title: "Send only actionable context",
                    description:
                        "Gemini receives only grouped conversations that already passed filtering instead of raw traffic, keeping extraction narrower, cheaper, and easier to inspect.",
                    related: "This stage completes the 4-stage pipeline.",
                },
            },
            constraintsTitle: "Constraints",
            constraints: [
                "Gemini calls had to stay low enough for sustained use across many active conversations.",
                "Waiting longer improved context quality, but batching also delayed task availability.",
                "Messages were noisy: acknowledgements, unauthorized senders, and partial fragments often resembled real requests.",
            ],
            validationTitle: "Validation",
            validation: [
                "Compared per-message extraction against buffered 60s grouping during internal testing.",
                "Observed that grouped bursts produced more coherent task payloads than isolated message snapshots.",
                "Measured a large drop in irrelevant Gemini calls after applying validity, authority, and intent filters before extraction.",
            ],
            processEvidenceTitle: "Process evidence",
            processEvidence: [
                {
                    label: "Traffic audit",
                    title: "Raw message noise was visible before the model",
                    detail: "I mapped acknowledgements, unauthorized senders, and fragmented bursts as separate message shapes before deciding what the model should never see.",
                },
                {
                    label: "Burst grouping",
                    title: "The buffer was designed around real message cadence",
                    detail: "I compared isolated snapshots against grouped 60-second windows to see when fragmented tasks turned into one coherent request.",
                },
                {
                    label: "Pipeline review",
                    title: "Each stage stayed inspectable during testing",
                    detail: "The final flow was kept as four explicit stages so filtering failures, batching delays, and extraction output could be tuned independently.",
                },
            ],
            resultingSystemTitle: "Result",
            resultSummary:
                "Reduced Gemini usage by filtering and batching messages before extraction, while keeping the pipeline explainable enough to tune during internal testing.",
            metrics: {
                apiReduction: "fewer Gemini calls after pre-filtering and batching",
                contextBuffer: "60s batching window used to preserve message context",
                filteringPipeline: "explicit stages kept the flow debuggable",
            },
            metricCards: {
                apiReduction: {
                    eyebrow: "Outcome",
                    title: "Reduced Gemini calls before extraction",
                    description:
                        "Internal testing showed that most traffic never reached Gemini once validity, authority, and intent filtering ran before extraction, producing an observed reduction of roughly 90% versus per-message processing.",
                    related:
                        "Validated through stage 02 Filter and side-by-side testing against per-message processing.",
                },
                contextBuffer: {
                    eyebrow: "Outcome",
                    title: "Improved task coherence before extraction",
                    description:
                        "The 60-second buffer reduced fragmented task creation by grouping related bursts before extraction instead of evaluating each message in isolation.",
                    related: "Observed during internal testing of grouped versus immediate extraction.",
                },
                filteringPipeline: {
                    eyebrow: "Outcome",
                    title: "Kept the pipeline inspectable",
                    description:
                        "Four explicit stages made it easier to debug false positives, adjust heuristics, and explain behavior than a single opaque model call.",
                    related: "Produced by the full pipeline and used during internal tuning.",
                },
            },
            tradeoffTitle: "Trade-off",
            tradeoff:
                "Accepted a 60-second batching delay to improve extraction coherence and reduce model calls, even though some tasks are not emitted immediately.",
        },
        rail: {
            contactEyebrow: "Direct contact",
            contactTitle: "Prefer email or WhatsApp",
            contactDescription:
                "If you want to talk about a frontend role, freelance work, or collaboration, send a short message and I will reply directly.",
            inViewLabel: "In view",
            videfaceTitle: "VideFace shipped systems",
            videfaceDescription: "Production work across calls, contracts, media flows, and touch interfaces.",
            videfaceHighlights: [
                {
                    title: "Calls, devices, and recordings",
                    detail: "Automatic recording, device fallback, agent-side controls, upload states, debounced refresh, and dated downloads.",
                },
                {
                    title: "Contracts and damage review",
                    detail: "Contract tabs, key-release integration, return walkarounds, locker video, date filters, and agent review surfaces.",
                },
            ],
            dragonflyTitle: "Dragonfly route tracking",
            dragonflyDescription:
                "Frontend work focused on live driver location, order assignment, and usable route tracking for a small logistics operation.",
            dragonflyHighlights: [
                {
                    title: "Live route visibility",
                    detail: "Coordinators could follow driver location and route progress in real time from the interface.",
                },
                {
                    title: "Order and delivery assignment",
                    detail: "The app exposed order assignment and delivery status clearly so field coordination was easier to understand.",
                },
                {
                    title: "Offline-safe capture",
                    detail: "Drivers could keep registering deliveries under weak signal and sync later without losing progress.",
                },
            ],
        },
        principles: {
            title: "Engineering Decisions",
            labels: {
                context: "Context",
                decision: "Decision",
                tradeoff: "Trade-off",
                result: "Result",
            },
            items: [
                {
                    label: "WhatsMyTask",
                    title: "Used heuristics before infrastructure",
                    context:
                        "The initial failure mode was noisy WhatsApp traffic generating unnecessary model calls, not poor extraction quality.",
                    decision:
                        "Kept isLikelyActionable as a narrow heuristic gate instead of adding a dedicated classification service or model stage.",
                    tradeoff:
                        "Heuristics require ongoing threshold tuning and will always be less flexible than a learned classifier.",
                    result: "That removed most irrelevant traffic before Gemini and kept the pipeline small enough to inspect and tune during internal testing.",
                },
                {
                    label: "VideFace",
                    title: "Prioritized immediate feedback in scheduling",
                    context:
                        "Waiting for network confirmation made scheduling actions feel slower than the actual work admins and agents were trying to complete.",
                    decision:
                        "Updated the UI immediately and used server confirmation as reconciliation instead of blocking every action behind a round trip.",
                    tradeoff:
                        "That adds some reconciliation complexity because the optimistic state can briefly diverge from the backend.",
                    result: "The interface felt faster in day-to-day usage while rollback paths kept actions reliable when sync failed.",
                },
                {
                    label: "Dragonfly",
                    title: "Kept the route UI clear during field work",
                    context:
                        "Drivers and coordinators needed to understand location, assignments, and delivery progress quickly from the phone interface.",
                    decision:
                        "Prioritized a clearer tracking flow with live status, assignment visibility, and offline-safe capture before adding extra complexity.",
                    tradeoff:
                        "That meant handling more state and sync logic on the client to keep the mobile experience understandable under weak signal.",
                    result: "The app stayed easier to use during active routes while still supporting real-time coordination and later synchronization.",
                },
            ],
        },
        stack: {
            title: "Stack",
            groups: [
                {
                    label: "Frontend",
                    items: ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand"],
                },
                { label: "Data & Auth", items: ["Supabase", "Firebase", "Clerk", "Prisma", "Zod"] },
                { label: "Workflow", items: ["Figma", "Notion"] },
                { label: "AI", items: ["Claude", "GitHub Copilot"] },
            ],
        },
        contact: {
            title: "Contact",
            heading: "If you'd like to work together, send me a message",
            description:
                "If you have a frontend role, a freelance project, or a collaboration in mind, a short message with context is enough.",
            success: "Message received. I'll get back to you.",
            quickActionsLabel: "Quick access",
            shortcutLabel: "Quick start",
            shortcuts: [
                {
                    label: "Hiring",
                    message: "Hi Joseph, I saw your portfolio and wanted to talk about a product engineering role.",
                },
                {
                    label: "Freelance",
                    message: "Hi Joseph, I saw your portfolio and wanted to discuss a freelance product build.",
                },
                {
                    label: "Collaboration",
                    message: "Hi Joseph, I saw your portfolio and wanted to explore a collaboration.",
                },
            ],
            fields: {
                name: "Name",
                email: "Email",
                message: "Message",
            },
            placeholders: {
                name: "Your name",
                email: "you@company.com",
                message: "What are you working on?",
            },
            sending: "Sending...",
            send: "Send message",
            errors: {
                failed: "Failed to send message",
                generic: "Something went wrong",
                nameMin: "Name must be at least 2 characters",
                emailInvalid: "Invalid email address",
                messageMin: "Message must be at least 10 characters",
            },
        },
    },
    es: {
        meta: {
            title: "Joseph Cuartas — Ingeniero Frontend",
            description:
                "Desarrollador Frontend con 2 años de experiencia construyendo interfaces para flujos en tiempo real. Actualmente en VideFace.",
        },
        common: {
            languageLabels: {
                en: "EN",
                es: "ES",
            },
            languageAria: {
                en: "Cambiar el idioma de la página a inglés",
                es: "Cambiar el idioma de la página a español",
            },
            social: {
                github: "GitHub",
                email: "Correo",
                linkedin: "LinkedIn",
            },
            actions: {
                contact: "Contacto",
                whatsapp: "WhatsApp",
                resume: "Descargar CV",
                copyEmail: "Copiar correo",
                copiedEmail: "Correo copiado",
            },
            copyEmailAria: "Copiar dirección de correo",
            theme: {
                toLight: "Cambiar a modo claro",
                toDark: "Cambiar a modo oscuro",
            },
        },
        nav: {
            about: "Sobre mí",
            experience: "Experiencia",
            projects: "Proyectos",
            principles: "Decisiones",
            stack: "Stack",
            contact: "Contacto",
            openMenu: "Abrir menú",
            closeMenu: "Cerrar menú",
        },
        hero: {
            availability: "Disponible para oportunidades",
            role: "Desarrollador Frontend",
            companyBadge: "VideFace · 2025–Actualidad",
            systemsLabel: "Enfoque en Rendimiento y Experiencia de Usuario",
            summary:
                "Soy desarrollador frontend construyendo interfaces para flujos en tiempo real. Me enfoco en que scheduling, tracking y estados de sincronización se sientan claros y rápidos incluso con señal inestable, y sigo mejorando a partir de pruebas, profiling y trabajo real de producto.",
            // caseStudiesLabel: "Casos seleccionados",
            caseStudies: [
                {
                    // type: "Caso",
                    title: "VideFace",
                    summary:
                        "Interfaz de coordinación en tiempo real para admins y agentes, con feedback inmediato y sincronización estable.",
                    // readTime: "6 min de lectura",
                    href: "#videface-case",
                },
                {
                    // type: "Destacado",
                    title: "WhatsMyTask",
                    summary:
                        "Asistente inteligente para extraer tareas de WhatsApp. Creé un filtro que limpia el ruido de los chats antes de enviarlos a la IA, reduciendo un 90% el costo de procesamiento y mejorando la precisión.",
                    // readTime: "8 min de lectura",
                    href: "#projects",
                },
                {
                    type: "Caso",
                    title: "Dragonfly",
                    summary:
                        "App de logística para seguimiento de rutas en campo, con ubicación en tiempo real, asignación de pedidos y captura usable para 300 usuarios y 7 camiones.",
                    // readTime: "5 min de lectura",
                    href: "#dragonfly-case",
                },
            ],
            caseStudiesCta: "Ver mas",
            proofPoints: [
                "operadores usando flujos de distribucion de agua en campo",
                "actualizaciones de seguimiento mantenidas por debajo de un segundo",
                "llamadas al LLM reducidas mediante extraccion por lotes en WhatsApp",
            ],
        },
        experience: {
            title: "Experiencia",
            current: "Actual",
            labels: {
                context: "Contexto",
                constraints: "Restricciones",
                role: "Rol",
                decisions: "Decisiones clave",
                alternative: "Alternativa descartada",
                validation: "Validacion",
                tradeoff: "Compromiso",
            },
            jobs: [
                {
                    id: "videface-case",
                    // caseType: "Caso",
                    // readTime: "6 min de lectura",
                    company: "VideFace",
                    role: "Ingeniero Frontend",
                    period: "2025 — Actualidad",
                    current: true,
                    stack: ["React", "Firestore", "Realtime Database", "Tailwind", "Electron"],
                    roleScope:
                        "Ingeniero Frontend enfocado en el diseño de interacción y la implementación de flujos de coordinación operativa, sincronización de datos y estados de recuperación.",
                    context:
                        "Desarrollo de la interfaz de coordinación (scheduling) utilizada por administradores, agentes y usuarios finales para gestionar herramientas y flujos de trabajo en campo en tiempo real.",
                    constraints: [
                        "Conectividad Crítica: La latencia de red y la inestabilidad del hardware en campo bloqueaban los flujos de operación.",
                        "Privacidad Multi-cliente: Los datos de distintos clientes (tenants) debían permanecer estrictamente aislados y seguros sobre una infraestructura compartida.",
                    ],
                    achievements: [
                        "Optimicé el tablero operativo sincronizado con Realtime Database para que admins y agentes vieran cambios de estado y asignación sin recargar.",
                        "Implementé herramientas de auditoría y trazabilidad para seguir mejor el ciclo de renta de vehículos desde la interfaz.",
                    ],
                    validation:
                        "Observado en pruebas con usuarios reales: tanto en herramientas administrativas como en dispositivos de agentes en campo, la confirmación optimista redujo la latencia percibida, logrando que las acciones se sintieran instantáneas (objetivo INP < 200ms) incluso con señal inestable.",
                    tradeoff:
                        "Acepté una mayor complejidad en la lógica de reconciliación de datos para asegurar que el usuario nunca vea un círculo de carga, priorizando la velocidad operativa sobre la simplicidad del código.",
                    decisions: [
                        {
                            title: "Respuesta Instantánea (Optimistic UI)",
                            rationale:
                                "Hice que la interfaz reflejara el cambio al instante mientras la confirmación del servidor ocurría en segundo plano, para que la operación se sintiera más fluida.",
                            alternative:
                                "Actualizar la UI solo tras la confirmación del servidor, ya que dejaba al usuario bloqueado por la latencia de red en cada interacción.",
                        },
                        {
                            title: "Interfaz personalizada por tenant",
                            rationale:
                                "Diseñé componentes dinámicos que se adaptan automáticamente según el ID de la compañía (tenant). Esto permite activar funcionalidades y estilos específicos para cada empresa manteniendo un núcleo de código compartido y eficiente.",
                            alternative:
                                "Mantener un solo flujo genérico para todos los tenants, aunque eso hacía más difícil adaptar la experiencia sin mezclar comportamientos.",
                        },
                    ],
                },
                {
                    id: "dragonfly-case",
                    // caseType: "Caso",
                    // readTime: "5 min de lectura",
                    company: "Dragonfly",
                    subtitle: "Logística para distribución de agua",
                    role: "Ingeniero Frontend",
                    period: "2023 — 2025",
                    current: false,
                    stack: ["React Native", "Firebase", "Realtime Database", "Maps"],
                    roleScope:
                        "Diseñé e implementé la interfaz móvil para tracking de campo, visibilidad de rutas en tiempo real y asignación de entregas.",
                    context:
                        "Construí la app usada para ver la ubicación de conductores en tiempo real, asignar pedidos y registrar entregas dentro de una operación de distribución de agua con unos 300 usuarios y 7 camiones.",
                    constraints: [
                        "La interfaz debía mantenerse fácil de entender durante la coordinación activa de rutas.",
                        "La ubicación en vivo y el estado de entregas debían sentirse rápidos incluso con señal inestable.",
                        "La captura de entregas no podía fallar cuando los conductores perdían conexión en campo.",
                    ],
                    achievements: [
                        "Construí la experiencia principal de la app usada por cerca de 300 usuarios y 7 camiones en rutas diarias de distribución.",
                        "Implementé vistas en tiempo real para ubicación de conductores, avance de entregas y asignación de pedidos, facilitando el seguimiento desde frontend.",
                        "Mantuve la interfaz usable con señal débil combinando captura offline y sincronización posterior.",
                        "Mejoré la ruta de actualización del cliente para que el tracking se sintiera ágil durante el uso activo.",
                    ],
                    validation:
                        "Validado en uso de campo y en pruebas internas sobre dispositivos móviles con conectividad deficiente.",
                    tradeoff:
                        "Acepté más lógica de sincronización en cliente para que el trabajo de ruta no dependiera de una señal estable.",
                    decisions: [
                        {
                            title: "Manejé la captura de entregas con enfoque offline-first",
                            rationale:
                                "Los conductores y operadores no podían depender de conexión estable mientras registraban entregas y avances de ruta.",
                            alternative:
                                "Descarté escrituras dependientes de conexión porque volvían poco confiable el avance de ruta en campo.",
                        },
                        {
                            title: "Priorizé una UI clara para ruta en móvil",
                            rationale:
                                "Los operadores necesitaban entender rápido ubicación, pedidos asignados y estado de entrega desde la pantalla del teléfono.",
                            alternative:
                                "Descarté pantallas más densas porque hacían más lenta y confusa la coordinación durante la ruta.",
                        },
                    ],
                },
            ],
        },
        projects: {
            sectionLabel: "Proyecto destacado",
            description: "Pipeline de extracción de tareas para conversaciones de WhatsApp Business usando Gemini API.",
            status: "Caso de estudio independiente",
            // readTime: "8 min de lectura",
            roleTitle: "Rol",
            role: "Proyecto personal enfocado en frontend y producto. Definí el pipeline, las reglas de filtrado, la lógica de buffering y el modelo de interacción usado para revisar trade-offs durante pruebas.",
            relatedWorkTitle: "Trabajo entregado en producción en VideFace",
            relatedWorkIntro:
                "Este caso de estudio independiente convive con sistemas frontend que ya entregue en produccion dentro de VideFace.",
            relatedWorkGroups: [
                {
                    title: "Sistema de Videollamadas / Agentes",
                    items: [
                        "Grabación automática de llamadas con control por rol (dev, agente, admin).",
                        "Detección y manejo de errores de cámara/micrófono con popups informativos.",
                        "Fallback automático al siguiente dispositivo disponible si el seleccionado falla.",
                        "Control de dispositivos del cliente desde el lado del agente.",
                        "Indicadores de estado de upload de videos y timestamps en UI.",
                        "Botón de refresh con debouncer para videos grabados.",
                        "Descarga de videos con nombre de fecha.",
                    ],
                },
                {
                    title: "Módulo de Contratos",
                    items: [
                        "Visualización de datos de retorno y entrega de llaves en tabs del contrato.",
                        "Guardado de walkaround de retorno y video de locker al ciclo de renta.",
                        "Filtros por rango de fechas en videos grabados.",
                        "contractId integrado en la liberación de llaves y asuntos de email.",
                        "Tab de revisión de reporte de auto para agentes.",
                    ],
                },
                {
                    title: "Reportes de Daños",
                    items: [
                        "Pantalla de reporte de daños para carwashers.",
                        "Reemplazo del carrusel de daños con tira de thumbnails y delete desde popup.",
                        "Integración del módulo de reporte en la preview del auto.",
                        "Tab de revisión de reportes de daño para agentes.",
                    ],
                },
                {
                    title: "Sistema de Videos / Clips",
                    items: [
                        "Eliminación automática de clips mayores a 7 días.",
                        "Indicador de tipo de clip en UI.",
                        "Filtros y visualización de grabaciones por agente; agentes ven los suyos y admin ve todos.",
                    ],
                },
                {
                    title: "Kiosko / Touch Screen",
                    items: [
                        "Pantalla touch para Amerirent (AmerirentTouch).",
                        "Carrusel de propiedades con editor de imágenes.",
                        "Touch prompt con header de marca, call to action y footer.",
                        "Dialog de Términos y Condiciones con toggle configurable.",
                        "Timer deshabilitado en vista mobile.",
                        "Fix de loop de cámara en kiosko.",
                    ],
                },
            ],
            scopeTitle: "Alcance",
            scope: "Caso de estudio enfocado en reducir uso innecesario del modelo mientras hacia el comportamiento de extraccion mas explicable y ajustable.",
            alternativeLabel: "Alternativa descartada",
            problemTitle: "Problema",
            problem:
                "Las conversaciones de WhatsApp llegaban en rafagas fragmentadas, y tratar cada mensaje como una llamada aislada a Gemini aumentaba el costo e introducia extracciones inconsistentes.",
            keyDecisionsTitle: "Decisiones clave",
            decisions: [
                {
                    title: "Filtre trafico antes de Gemini",
                    rationale:
                        "Los chequeos de validez, autoridad e intencion eran mas baratos que pagar por el modelo para inspeccionar cada mensaje.",
                    alternative:
                        "Descarte clasificacion por mensaje con el modelo porque elevaba costo y seguia dejando ruido dentro del flujo.",
                },
                {
                    title: "Agrupe rafagas en una ventana de 60 segundos",
                    rationale:
                        "Las rafagas agrupadas producian payloads mas coherentes que extraer de inmediato desde snapshots fragmentados.",
                    alternative:
                        "Descarte extraccion inmediata porque emitia tareas parciales o duplicadas cuando el usuario escribia en varias rafagas cortas.",
                },
                {
                    title: "Mantener el pipeline explicito en lugar de opaco",
                    rationale:
                        "Un flujo por etapas hacia falsos positivos, retrasos y decisiones de tuning inspeccionables durante las pruebas.",
                    alternative:
                        "Descarte una sola llamada end-to-end al modelo porque era mas dificil de depurar y de defender cuando el comportamiento cambiaba.",
                },
            ],
            solutionTitle: "Diseno del sistema",
            interactionHint: "Pasa el cursor o enfoca una etapa para inspeccionar por que existe en el pipeline.",
            pipeline: [
                { step: "01", title: "Ingreso", detail: "capturar trafico bruto antes de filtrar o agrupar" },
                {
                    step: "02",
                    title: "Filtro",
                    detail: "remover mensajes invalidos, no autorizados y de baja intencion antes del modelo",
                },
                { step: "03", title: "Buffer", detail: "agrupar rafagas relacionadas en una ventana comun de 60 s" },
                { step: "04", title: "Extracción", detail: "enviar a Gemini solo contexto agrupado y accionable" },
            ],
            stageCards: {
                inbound: {
                    eyebrow: "Ingreso bruto",
                    title: "Empezar con todo el tráfico",
                    description:
                        "El pipeline comienza con trafico sin procesar en lugar de clasificar temprano con el modelo, para que cada reduccion posterior sea explicita, medible y depurable.",
                    related: "Conectado con la métrica del pipeline de 4 etapas.",
                },
                filter: {
                    eyebrow: "Control de costo",
                    title: "Filtrar antes del modelo",
                    description:
                        "Los chequeos de validez, autoridad e intencion bloquean mensajes vacios, no autorizados y no accionables antes de cualquier llamada a Gemini, en lugar de pagar por clasificar todo mas adelante.",
                    related: "Esta etapa impulsa la reducción cercana al 90 % en llamadas API.",
                },
                buffer: {
                    eyebrow: "Calidad de contexto",
                    title: "Agrupar ráfagas relacionadas",
                    description:
                        "Una ventana de 60 segundos une rafagas fragmentadas en un solo contexto de extraccion en lugar de decidir sobre snapshots aislados a medida que llegan.",
                    related: "Esta etapa produce el buffer de contexto de 60 s.",
                },
                extract: {
                    eyebrow: "Límite controlado",
                    title: "Enviar solo contexto accionable",
                    description:
                        "Gemini recibe solo conversaciones agrupadas que ya pasaron por filtrado, en lugar de trafico bruto, manteniendo la extraccion enfocada, mas barata y mas facil de inspeccionar.",
                    related: "Esta etapa completa el pipeline de 4 etapas.",
                },
            },
            constraintsTitle: "Restricciones",
            constraints: [
                "Las llamadas a Gemini debian mantenerse lo suficientemente bajas para un uso sostenido sobre muchas conversaciones activas.",
                "Esperar mas tiempo mejoraba el contexto, pero tambien retrasaba la disponibilidad de tareas.",
                "Los mensajes eran ruidosos: acuses, remitentes no autorizados y fragmentos parciales se parecian a pedidos reales.",
            ],
            validationTitle: "Validacion",
            validation: [
                "Compare procesamiento por mensaje contra agrupacion en ventana de 60 segundos durante pruebas internas.",
                "Observe que las rafagas agrupadas producian payloads de tareas mas coherentes que snapshots aislados por mensaje.",
                "Medi una caida clara en llamadas irrelevantes a Gemini despues de aplicar filtros de validez, autoridad e intencion antes de extraer.",
            ],
            processEvidenceTitle: "Evidencia de proceso",
            processEvidence: [
                {
                    label: "Auditoria de trafico",
                    title: "El ruido era visible antes del modelo",
                    detail: "Mapee acuses, remitentes no autorizados y rafagas fragmentadas como formas distintas de mensaje antes de decidir que nunca debia ver el modelo.",
                },
                {
                    label: "Agrupacion de rafagas",
                    title: "El buffer se diseno sobre cadencia real",
                    detail: "Compare snapshots aislados con ventanas agrupadas de 60 segundos para ver cuando tareas fragmentadas se convertian en una sola solicitud coherente.",
                },
                {
                    label: "Revision del pipeline",
                    title: "Cada etapa permanecio inspeccionable",
                    detail: "El flujo final se mantuvo en cuatro etapas explicitas para ajustar por separado fallos de filtrado, retrasos de batching y salida de extraccion.",
                },
            ],
            resultingSystemTitle: "Resultado",
            resultSummary:
                "Redujo el uso de Gemini al filtrar y agrupar mensajes antes de extraer, manteniendo al mismo tiempo un pipeline lo bastante explicable para ajustarlo en pruebas internas.",
            metrics: {
                apiReduction: "menos llamadas a Gemini despues de filtrar y agrupar",
                contextBuffer: "ventana de 60 s usada para preservar contexto",
                filteringPipeline: "etapas explicitas para mantener el flujo depurable",
            },
            metricCards: {
                apiReduction: {
                    eyebrow: "Resultado",
                    title: "Reduje llamadas a Gemini antes de extraer",
                    description:
                        "Las pruebas internas mostraron que gran parte del trafico nunca llegaba a Gemini una vez que el filtrado de validez, autoridad e intencion corria antes de la extraccion, con una reduccion observada cercana al 90 % frente al procesamiento por mensaje.",
                    related: "Validado con la etapa 02 Filtro y comparacion contra procesamiento por mensaje.",
                },
                contextBuffer: {
                    eyebrow: "Resultado",
                    title: "Mejore la coherencia antes de extraer",
                    description:
                        "La ventana de 60 segundos redujo creacion de tareas fragmentadas al agrupar rafagas relacionadas antes de extraer, en lugar de evaluar cada mensaje por separado.",
                    related: "Observado en pruebas internas entre extraccion agrupada e inmediata.",
                },
                filteringPipeline: {
                    eyebrow: "Resultado",
                    title: "Mantuvimos el pipeline inspeccionable",
                    description:
                        "Cuatro etapas explicitas hicieron mas facil depurar falsos positivos, ajustar heuristicas y explicar el comportamiento que una sola llamada opaca al modelo.",
                    related: "Lo produce el pipeline completo y se uso durante el ajuste interno.",
                },
            },
            tradeoffTitle: "Compromiso",
            tradeoff:
                "Acepta una espera de 60 segundos para mejorar la coherencia de extraccion y reducir llamadas al modelo, aunque eso retrasa la emision inmediata de algunas tareas.",
        },
        rail: {
            contactEyebrow: "Contacto directo",
            contactTitle: "Mejor por correo o WhatsApp",
            contactDescription:
                "Si quieres hablar de una vacante frontend, un proyecto freelance o una colaboración, envíame un mensaje corto y te respondo directo.",
            inViewLabel: "En vista",
            videfaceTitle: "Sistemas entregados en VideFace",
            videfaceDescription: "Trabajo en producción sobre videollamadas, contratos, medios y flujos táctiles.",
            videfaceHighlights: [
                {
                    title: "Llamadas, dispositivos y grabaciones",
                    detail: "Grabación automática, fallback de dispositivos, controles desde agente, estados de upload, refresh con debouncer y descargas con fecha.",
                },
                {
                    title: "Contratos y revisión de daños",
                    detail: "Tabs de contrato, integración de llaves, walkarounds de retorno, video de locker, filtros por fecha y superficies de revisión para agentes.",
                },
            ],
            dragonflyTitle: "Tracking de rutas en Dragonfly",
            dragonflyDescription:
                "Trabajo frontend enfocado en ubicación de conductores en tiempo real, asignación de pedidos y seguimiento claro de rutas.",
            dragonflyHighlights: [
                {
                    title: "Visibilidad de rutas en vivo",
                    detail: "Los coordinadores podían seguir ubicación de conductores y avance de ruta en tiempo real desde la interfaz.",
                },
                {
                    title: "Asignación de pedidos y entregas",
                    detail: "La app mostraba de forma clara pedidos asignados y estado de entregas para facilitar la operación diaria.",
                },
                {
                    title: "Captura segura con mala señal",
                    detail: "Los conductores podían seguir registrando entregas con señal débil y sincronizar después sin perder progreso.",
                },
            ],
        },
        principles: {
            title: "Decisiones de ingeniería",
            labels: {
                context: "Contexto",
                decision: "Decisión",
                tradeoff: "Compromiso",
                result: "Resultado",
            },
            items: [
                {
                    label: "WhatsMyTask",
                    title: "Usé heurísticas antes que infraestructura",
                    context:
                        "El fallo inicial era el ruido del trafico en WhatsApp generando llamadas innecesarias al modelo, no una mala calidad de extraccion.",
                    decision:
                        "Mantener isLikelyActionable como una compuerta heuristica acotada en lugar de agregar un servicio o etapa dedicada de clasificacion.",
                    tradeoff:
                        "Las heuristicas requieren ajuste continuo de umbrales y siempre seran menos flexibles que un clasificador aprendido.",
                    result: "Eso removio la mayor parte del trafico irrelevante antes de Gemini y mantuvo el pipeline lo bastante pequeno para inspeccionarlo y ajustarlo en pruebas internas.",
                },
                {
                    label: "VideFace",
                    title: "Prioricé feedback inmediato en scheduling",
                    context:
                        "Esperar confirmación de red hacía que las acciones de scheduling se sintieran más lentas que el trabajo real de admins y agentes.",
                    decision:
                        "Actualicé la UI de inmediato y dejé la confirmación del servidor como ruta de reconciliación, en lugar de bloquear cada acción por un round trip.",
                    tradeoff:
                        "Eso agrega algo de complejidad de reconciliación porque el estado optimista puede divergir temporalmente del backend.",
                    result: "La interfaz se sintió más rápida en el uso diario y la lógica de rollback mantuvo confiabilidad cuando falló la sincronización.",
                },
                {
                    label: "Dragonfly",
                    title: "Mantuve clara la UI de rutas en campo",
                    context:
                        "Conductores y coordinadores necesitaban entender rápido ubicación, asignaciones y progreso de entregas desde la interfaz móvil.",
                    decision:
                        "Priorizé un flujo de tracking más claro, con estado en vivo, visibilidad de asignaciones y captura segura con mala señal, antes de agregar más complejidad.",
                    tradeoff:
                        "Eso exigió manejar más estado y sincronización en cliente para que la experiencia siguiera siendo entendible en ruta.",
                    result: "La app se mantuvo más fácil de usar durante la operación diaria sin perder soporte para coordinación en tiempo real y sincronización posterior.",
                },
            ],
        },
        stack: {
            title: "Stack",
            groups: [
                {
                    label: "Frontend",
                    items: ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand"],
                },
                { label: "Datos y auth", items: ["Supabase", "Firebase", "Clerk", "Prisma", "Zod"] },
                { label: "Workflow", items: ["Figma", "Notion"] },
                { label: "IA", items: ["Claude", "GitHub Copilot"] },
            ],
        },
        contact: {
            title: "Contacto",
            heading: "Si quieres trabajar conmigo, envíame un mensaje",
            description:
                "Si tienes una vacante frontend, un proyecto freelance o una colaboración en mente, con un mensaje corto y algo de contexto es suficiente.",
            success: "Mensaje recibido. Te responderé pronto.",
            quickActionsLabel: "Acceso rápido",
            shortcutLabel: "Comenzar rápido",
            shortcuts: [
                {
                    label: "Contratacion",
                    message: "Hola Joseph, vi tu portafolio y quiero hablar contigo sobre una oportunidad de producto.",
                },
                {
                    label: "Freelance",
                    message: "Hola Joseph, vi tu portafolio y quiero hablar contigo sobre un proyecto freelance.",
                },
                {
                    label: "Colaboracion",
                    message: "Hola Joseph, vi tu portafolio y quiero explorar una colaboracion contigo.",
                },
            ],
            fields: {
                name: "Nombre",
                email: "Correo",
                message: "Mensaje",
            },
            placeholders: {
                name: "Tu nombre",
                email: "tu@empresa.com",
                message: "¿En qué estás trabajando?",
            },
            sending: "Enviando...",
            send: "Enviar mensaje",
            errors: {
                failed: "No se pudo enviar el mensaje",
                generic: "Algo salió mal",
                nameMin: "El nombre debe tener al menos 2 caracteres",
                emailInvalid: "Dirección de correo inválida",
                messageMin: "El mensaje debe tener al menos 10 caracteres",
            },
        },
    },
} as const;

export type TranslationDictionary = (typeof translations)["en"];
