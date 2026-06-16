/**
 * Work index + case study copy. Replace URLs, metrics, and product names where you want tighter accuracy.
 */

/**
 * Remote thumbnail URL (thum.io). Fine for optional `<img src>` with `onError` handling;
 * avoid relying on it as the only hero art — prefer bundled assets via `new URL(..., import.meta.url)`.
 */
export function liveSitePreview(url) {
    if (!url) return '';
    const u = url.trim();
    return `https://image.thum.io/get/width/1280/crop/720/noanimate/${encodeURIComponent(u)}`;
}

/** Bundled case-study assets (paths relative to this file). */
const statforgeLifecycleShot = new URL('../images/statforge lifecycle.png', import.meta.url).href;
const leadConsoleHeroShot = new URL('../images/leadgen.png', import.meta.url).href;
const fiberHostingHeroShot = new URL('../images/fiberhosting.png', import.meta.url).href;

export const WORK_PROJECTS = [
    {
        slug: 'statforge',
        featured: true,
        title: 'StatForge',
        subtitle: 'Verification and data platform for competitive match outcomes (StatForge.gg)',
        proofBadge: 'Platform',
        description:
            'Integrate once, read consistent results everywhere: a public API on top of a reconciliation engine that turns noisy inputs into one verified match record.',
        icon: '📊',
        tech: [
            'PostgreSQL (system of record)',
            'Python (services + workers)',
            'Redis (queue + broker)',
            'Kubernetes (runtime)',
            'Public API design (read model contract)',
            'Review workflows (verification system)'
        ],
        /* Bundled asset: thum.io previews often fail as CSS backgrounds in dev/production. */
        image: statforgeLifecycleShot,
        demoLink: 'https://stat-forge.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [statforgeLifecycleShot],
        caseStudy: {
            summary:
                'StatForge is a clean external product: verified match outcomes your integrations can rely on. Under that surface is the platform work that makes “one match, one record, one version of truth” real: schema evolution, auth boundaries, background processing, and review workflows that stay coherent as the product grows.',
            whatItIs:
                'A verification and data platform for competitive match outcomes. Tournament platforms, apps, and partners call read endpoints for the same published structure; the hard part is not drawing a chart, it is guaranteeing that every surface agrees on the official result.',
            problem:
                'Most systems still sit on raw stats and best-effort scrapes. That works until sources disagree, match IDs drift across tools, and your team spends cycles reconciling instead of shipping. The product promise is simple: stop wiring fragile stat pipelines and read outcomes you do not have to second-guess.',
            lifecycleHeroTitle: 'From noisy inputs → one verified outcome',
            lifecycleHeroSubtitle:
                'The path from inconsistent signals to a published record your integrations can trust — before request-path architecture.',
            differencePunchyLines: [
                'StatForge is not another API.',
                'It is a verification system.',
                'Raw signals disagree.',
                'Stat pipelines drift.',
                'Teams reconcile instead of shipping.',
                'StatForge ingests, reconciles, reviews, and publishes a single outcome your system can trust.'
            ],
            pullQuote:
                'The engineering-heavy pieces in this stack — queues, migrations, permissions, performance — exist to protect that contract under real traffic and real operators.',
            hideScreenshots: false,
            showStatForgeLifecycle: true,
            architecture: `Integrators (apps, sites, partners)
        │
        ▼
┌────────────────────┐     ┌──────────────────────────┐
│ Public read API    │     │ Ingestion + signals      │
│ (stable shapes)    │     │ (imports, webhooks)      │
└─────────┬──────────┘     └────────────┬─────────────┘
          │                             │
          └────────── Core platform: verification state machine,
                     reconciliation, review, publish canonical match
                     records + audit trail (Postgres, workers, Redis)
`,
            stackNotes:
                'PostgreSQL holds canonical match records, review state, and audit-friendly history. Redis and workers carry ingestion, reconciliation, and notification paths with explicit retries and operator visibility. Kubernetes runs the services; the public read API is versioned so integrators keep a stable shape while the verification engine evolves behind it.',
            personalBuild: [
                'Owned schema and migrations so verification states and publication rules could evolve without breaking existing integrators.',
                'Implemented job pipelines for ingestion and reconciliation with clear failure semantics (retries, dead letters, operator dashboards).',
                'Shipped API and auth boundaries so tenants and keys stayed isolated while still supporting partner-style access patterns.',
                'Worked performance and indexing paths once real match volume and history queries exposed hotspots in the read model.'
            ],
            personalBuildCards: [
                {
                    title: 'Schema & migrations',
                    body: 'Owned verification and publication schema so states and rules could evolve without breaking existing integrators.'
                },
                {
                    title: 'Async pipelines',
                    body: 'Built ingestion and reconciliation workers with explicit retries, dead-letter paths, and operator visibility when jobs fail.'
                },
                {
                    title: 'API + auth boundaries',
                    body: 'Shipped tenant-safe APIs and keys so reads and partner-style access stayed isolated from production data paths.'
                },
                {
                    title: 'Performance tuning',
                    body: 'Tightened indexes and read-model queries once real match volume and history exposed latency hotspots.'
                }
            ],
            technicalChallenges: [
                'Reconciling conflicting signals without losing traceability: grouping, inference, and evidence had to stay explainable for review and for future disputes.',
                'Keeping read latency predictable as history and standings grew without turning every page into bespoke SQL.',
                'Modeling permissions so operators could move fast in review workflows without creating foot-guns for production data.',
                'Shipping schema and rule changes continuously while integrators depended on a stable published contract.'
            ],
            links: [{ href: 'https://stat-forge.fiberhostingservices.com/', label: 'Live product (StatForge.gg)' }]
        }
    },
    {
        slug: 'fiber-hosting',
        title: 'Fiber Hosting',
        subtitle: 'Self-hosted cloud & hosting platform',
        proofBadge: 'Infrastructure',
        description:
            'Control-plane thinking on real metal and clusters: provisioning, networking edges, and operational guardrails for customer-facing hosting workloads.',
        icon: '⚡',
        tech: ['Proxmox', 'Kubernetes', 'Docker', 'NGINX', 'Terraform', 'Linux'],
        image: fiberHostingHeroShot,
        demoLink: 'https://fiberhostingservices.com/',
        repoLink: 'https://github.com/Mystshara/web-game-hosting-demo',
        screenshots: [
            fiberHostingHeroShot,
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop'
        ],
        caseStudy: {
            summary:
                'Fiber Hosting is the strongest public infrastructure story: turning “servers and clusters” into a repeatable platform customers can depend on.',
            whatItIs:
                'A hosting and edge platform spanning self-hosted virtualization (Proxmox) and Kubernetes-backed services, with emphasis on provisioning flows, network ingress, and day-2 operations.',
            problem:
                'Hosting products fail in boring ways: flaky provisioning, unclear networking paths, and upgrades that require heroics. The goal is predictable lifecycle operations at scale, not a demo cluster.',
            architecture: `Customers / edge traffic
        │
        ▼
┌──────────────┐      ┌─────────────────────┐
│ NGINX / TLS  │─────▶│ app + game workloads │
└──────┬───────┘      └──────────┬──────────┘
       │                         │
       ▼                         ▼
┌──────────────┐      ┌─────────────────────┐
│ Proxmox      │      │ Kubernetes          │
│ (metal/VM)   │      │ (scheduling, rollouts)│
└──────────────┘      └─────────────────────┘
        │                         │
        └──────── Terraform / automation ───────┘`,
            stackNotes:
                'Proxmox for bare-metal/VM foundations, Kubernetes for orchestration, Docker images as the portable unit of delivery, NGINX at the edge, Terraform for reproducible infrastructure, and Linux primitives done correctly (systemd, cgroups, observability hooks).',
            personalBuild: [
                'Designed provisioning flows so new capacity could join the fleet without manual snowflake steps.',
                'Hardened ingress/TLS termination patterns and documented failure modes operators actually hit.',
                'Built automation that treated infrastructure like software: reviewable changes, rollbacks, and drift detection where possible.',
                'Operationalized upgrades with canaries and clear health checks, not “restart and hope.”'
            ],
            technicalChallenges: [
                'Bridging Proxmox-era networking assumptions with Kubernetes networking without creating blind spots.',
                'Keeping provisioning idempotent when hardware and hypervisors disagree in subtle ways.',
                'Balancing customer self-service with guardrails that prevent catastrophic misconfiguration.'
            ],
            links: [
                { href: 'https://fiberhostingservices.com', label: 'Live site' },
                { href: 'https://github.com/Mystshara/web-game-hosting-demo', label: 'Reference repo' }
            ]
        }
    },
    {
        slug: 'ai-lead-generation',
        title: 'Lead Console',
        subtitle: 'Hiring-signal intelligence for recruiter outreach',
        proofBadge: 'SaaS Tool',
        description:
            'A recruiter-facing lead intelligence system that ingests public careers and ATS pages, detects hiring intent with deterministic rules, deduplicates company opportunities, and ranks leads by outreach priority.',
        icon: '🎯',
        tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Web ingestion', 'Deterministic scoring'],
        image: leadConsoleHeroShot,
        demoLink: 'https://lead.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [leadConsoleHeroShot],
        caseStudy: {
            summary:
                'Lead Console helps recruiting and outreach teams answer a practical question: which companies are actively hiring for roles we care about, and which ones are worth contacting first? The system ingests public careers and ATS pages, extracts hiring signals, deduplicates company-level opportunities, scores intent, and routes leads through a human review workflow. The core signal logic is deterministic and explainable, not hidden behind a black box.',
            whatItIs:
                'A lead-intelligence platform for recruiters and recruiting teams. Users can submit a company, careers page, or job-board URL, then the system analyzes the page for hiring signals: engineering role density, infrastructure keywords, ATS identity, employer slug, careers-page confidence, transformation language, and contact intent. The output is a ranked lead queue with evidence, outreach context, review status, and workflow actions.',
            problem:
                'Recruiters do not just need company names. They need timing and intent. A company hiring platform, infrastructure, SRE, DevOps, cloud, security, or backend roles is publicly signaling growth, delivery pressure, or internal scaling pain. Lead Console turns messy public hiring data into a prioritized outreach workflow.',
            diagramTitle: 'Lead scoring pipeline',
            diagramSteps: [
                { title: 'React console', detail: 'Queue, filters, lead detail' },
                { title: 'FastAPI API', detail: 'Auth, ingest, dedupe, workflow' },
                { title: 'Postgres', detail: 'Leads, JSONB enrichment, audit' },
                { title: 'Redis queue', detail: 'RPUSH and BLPOP events' },
                { title: 'Python worker', detail: 'Scoring, signals, contact intent' },
                { title: 'Postgres', detail: 'Scored lead and events' }
            ],
            diagramNote:
                'Ingest stays request-driven. Heavy scoring work is queued through Redis and written back by workers so the review console can keep moving.',
            architectureIntro:
                'A submitted URL enters the API, gets normalized and SSRF-validated, then is fetched and reduced into lead enrichment. The API stores or merges the company opportunity, publishes a scoring event, and the worker writes deterministic signals back to Postgres for the review console.',
            hideArchitectureBlock: true,
            architecture: `React Lead Console
        |
        v
FastAPI API ---------------------> Public careers / ATS pages
        |
        v
Postgres
        |
        v
Redis lead_events queue
        |
        v
Python Worker
        |
        v
Postgres`,
            stackNotes:
                'React powers the lead review console. FastAPI handles auth, ingest, careers-page discovery, dedupe, workflow actions, scoring queue publication, and CSV export. PostgreSQL is the source of truth for leads, enrichment JSONB, users, sessions, and audit events. Redis provides a simple FIFO queue using RPUSH and BLPOP. Python workers process scoring and outreach context asynchronously. Public web ingestion is defensive: URL normalization, SSRF validation, retries and backoff, domain cooldowns after rate limits, structured upstream error mapping, and generic extraction when page markup changes.',
            personalBuild: [
                'Designed the intake pipeline for public careers and ATS URLs, including URL normalization, SSRF validation, page fetching, boilerplate stripping, metadata extraction, and enrichment storage.',
                'Built deterministic scoring rules for hiring intent, role-family signals, ATS identity, repeated engineering titles, infrastructure keywords, page confidence, and transformation language.',
                'Implemented company-level deduplication across exact URLs, registrable domains, website hosts, emails, company/contact identity, and multi-tenant ATS boards like Lever, Greenhouse, Ashby, and Workable.',
                'Built the async scoring flow with Redis and Python workers so ingestion can queue scoring work and keep the UI responsive.',
                'Shipped the recruiter workflow surface: ranked leads, filters, lead detail evidence, contact intent, review status, outreach actions, and CSV export.'
            ],
            technicalChallenges: [
                'Dedupe had to be conservative. Two Ashby or Greenhouse URLs may share the same host but belong to completely different companies, so the system compares ATS board identity and employer slugs instead of blindly merging by domain.',
                'The scoring needed to stay explainable. Recruiters need to know why a company is worth contacting, so the system preserves keywords, evidence, enrichment data, contact-intent reasoning, and audit events.',
                'Public web ingestion is unreliable by nature. The system has to handle 403s, 404s, 429s, timeouts, changed markup, thin pages, ATS redirects, and repeated re-ingests without corrupting lead identity.',
                'The product is company/opportunity-centric, not job-posting-centric. Multiple job URLs for the same company collapse into one lead while preserving merged source URLs and combined signal evidence.',
                'Scaling would require pagination, stronger database constraints, indexed workflow filters, durable queue recovery, scheduled re-crawls, and normalized lead-signal columns promoted out of JSONB where query volume justifies it.'
            ],
            links: [{ href: 'https://lead.fiberhostingservices.com/', label: 'Live product (Lead Console)' }]
        }
    },
    {
        slug: 'security-automation-platform',
        title: 'Security Automation Platform',
        subtitle: 'PTaaS-style stack + vulnerability discovery pipelines',
        proofBadge: 'Security Automation',
        description:
            'One coherent security-engineering story: modular automation, policy-as-code, secrets discipline, and scanner orchestration, with a public reference implementation on GitHub.',
        icon: '🛡️',
        tech: ['Kubernetes', 'Terraform', 'Vault', 'Trivy', 'ZAP', 'GitHub Actions', 'Python'],
        image: liveSitePreview('https://github.com/Mystshara/ptaas-security-demo'),
        demoLink: 'https://github.com/Mystshara/ptaas-security-demo',
        repoLink: 'https://github.com/Mystshara/ptaas-security-demo',
        screenshots: [
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop'
        ],
        caseStudy: {
            summary:
                'Bug-bounty style discovery and a PTaaS-style modular stack are the same engineering muscle: repeatable pipelines, safe secrets, and automation you can audit, merged here as one public platform narrative.',
            whatItIs:
                'A reference security automation platform demonstrating how vulnerability discovery workflows, infrastructure provisioning, and secrets management fit together as a maintainable system.',
            problem:
                'Security tooling fails when it is a pile of scripts run by one person. Teams need reproducible environments, traceable changes, and integration points that match how engineering already ships software.',
            architecture: `CI / GitHub Actions
        │
        ▼
┌──────────────────────┐      ┌─────────────────┐
│ build / test / scan │─────▶│ artifact + SBOM │
└──────────┬──────────┘      └────────┬────────┘
           │                          │
           ▼                          ▼
┌──────────────────────┐    ┌─────────────────────┐
│ Kubernetes runtime   │    │ Vault (secrets)     │
│ (deploy, policies)   │    │ (identity, leases)  │
└──────────┬───────────┘    └─────────────────────┘
           │
           ▼
┌──────────────────────┐
│ scanners (Trivy/ZAP) │
│ + orchestration      │
└──────────────────────┘`,
            stackNotes:
                'Terraform for infrastructure as code, Kubernetes as execution substrate, Vault for secrets and identity-aware access, CI/CD for gates, and scanners orchestrated as first-class jobs, not manual clicks.',
            personalBuild: [
                'Consolidated “PTaaS demo” and bug-bounty automation narratives into one modular layout so the repo reads as a platform, not a one-off.',
                'Implemented pipeline patterns that separate build-time and runtime security signals.',
                'Emphasized least-privilege flows and secret lifecycle patterns that survive scrutiny beyond a README screenshot.'
            ],
            technicalChallenges: [
                'Keeping scanner orchestration reliable across flaky targets and rate limits.',
                'Making Terraform + Kubernetes boundaries clear so changes remain reviewable as the stack grows.',
                'Documenting threat models and trade-offs honestly: reference architectures should teach, not market.'
            ],
            links: [{ href: 'https://github.com/Mystshara/ptaas-security-demo', label: 'GitHub reference' }]
        }
    }
];

export function getProjectBySlug(slug) {
    return WORK_PROJECTS.find((p) => p.slug === slug) ?? null;
}
