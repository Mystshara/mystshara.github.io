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
        subtitle: 'Verified match data, leaderboards, and developer APIs for competitive games',
        proofBadge: 'Platform',
        description:
            'Tracker data, scheduled events, reports, and operator review all feed one platform record. The system resolves player identity, detects candidate activity, verifies match results, and publishes leaderboards, player pages, and scoped API data.',
        icon: '📊',
        tech: [
            'Next.js',
            'ASP.NET',
            'Fastify',
            'Node worker',
            'MySQL',
            'PostgreSQL',
            'Docker',
            'GitHub Actions',
            'GameTools API'
        ],
        /* Bundled asset: thum.io previews often fail as CSS backgrounds in dev/production. */
        image: statforgeLifecycleShot,
        demoLink: 'https://stat-forge.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [statforgeLifecycleShot],
        caseStudy: {
            summary:
                'StatForge is the platform layer around competitive game data. The public site shows players, matches, and leaderboards. The portal handles applications and API keys. Operators review candidate matches before results become official. The BF6 tracker is one input into that system. It resolves players through GameTools, polls stats over time, stores raw snapshots, and detects likely match activity from aggregate stat changes. That activity does not go straight to the public site. It goes through correlation and review first.',
            whatItIs:
                'There are two different kinds of data in the system: tracker data and verified platform data. Tracker data is raw and inferred. A worker polls GameTools, stores snapshots, hashes payloads to avoid duplicate rows, and looks for deltas in global stats. If matchesPlayed increases, that can become a candidate match. Verified platform data is the record users and integrators actually see. The platform API owns users, linked game identities, teams, tournaments, scrims, matches, match results, applications, API keys, scopes, and review state. Operators sit between those two layers. They review tracker candidates, compare them against expected matches and reports, and decide what becomes a canonical match record.',
            problem:
                'GameTools can tell me a player\'s current BF6 stats. It cannot tell me whether those stats belong to a verified match in StatForge, who reported the result, whether the match was scheduled, or whether the player identity is linked to a platform account. That missing context is the platform\'s job. The tracker collects evidence. The platform resolves identity, ties activity to expected matches, records review decisions, and publishes only the data that passed validation.',
            lifecycleHeroTitle: 'Tracker evidence to verified records',
            lifecycleHeroSubtitle:
                'The path from raw tracker activity to a reviewed record your integrations can trust.',
            differencePunchyLines: [
                'GameTools gives current stats.',
                'The tracker stores evidence.',
                'The platform owns verification.',
                'Operators review candidates.',
                'The API publishes canonical records.',
                'Leaderboards only read from verified data.'
            ],
            pullQuote:
                'The hardest platform problem was deciding when inferred activity becomes verified truth.',
            hideScreenshots: false,
            showStatForgeLifecycle: true,
            diagramTitle: 'Verified data flow',
            diagramSteps: [
                { title: 'Next.js web', detail: 'Public site, portal, review' },
                { title: 'ASP.NET API', detail: 'Auth, RBAC, matches, keys' },
                { title: 'MySQL platform', detail: 'Users, identities, canonical records' },
                { title: 'Tracker API', detail: 'Fastify resolve and reads' },
                { title: 'Node poller', detail: 'GameTools batch polling' },
                { title: 'Postgres tracker', detail: 'Snapshots and detected matches' },
                { title: 'Review', detail: 'Candidates become verified data' }
            ],
            diagramNote:
                'Public and portal traffic goes through the platform API. The tracker is a subsystem for identity resolution, polling, snapshots, and candidate detection.',
            architectureIntro:
                'Public pages, portal flows, and operator tools all go through the platform API. The tracker is not the product boundary. It is an internal subsystem that resolves players, polls GameTools, stores snapshots, and produces candidate activity for review. The platform owns the verified record. It decides which tracker candidates line up with scheduled events, reports, linked identities, and staff validation.',
            hideArchitectureBlock: true,
            architecture: `apps/web (Next.js)
Reference site | Marketing | Portal | Operator review
        |
        v
platform-api (ASP.NET)
Auth | RBAC | Apps and keys | Matches | Leaderboards | Review
        |
        +--> MySQL platform DB
        |    users, identities, matches, results, reviews, apps, keys
        |
        +--> tracker-api and tracker-poller
             Fastify API | Node worker | GameTools
                    |
                    v
             PostgreSQL tracker DB
             tracked players, snapshots, detected matches`,
            stackNotes:
                'apps/web is the Next.js frontend. It covers public player and leaderboard pages, marketing/reference pages, portal flows, and /app/review. platform-api is the ASP.NET API. It handles portal sessions, Discord and email/password auth, RBAC, applications, API keys, scopes, leaderboards, matches, review actions, and tracker read-through routes. The tracker service is separate. tracker-api is Fastify. It resolves players by platformId and platformNick, reads latest snapshots by personaId, and enrolls tracked players. tracker-poller is a Node worker that batches GameTools requests and writes snapshots to PostgreSQL. MySQL stores platform data: users, linked game identities, matches, match results, teams, tournaments, scrims, review records, portal applications, API keys, and scopes. API consumers, operators, and internal services do not all hit the same endpoints. The platform API exposes curated data while raw tracker data stays behind platform-mediated or internal routes.',
            personalBuild: [
                'Built the resolve path from platformId and platformNick to stable BF6 identity. The system caches GameTools results, stores persona and nucleus IDs, and enrolls resolved players for polling.',
                'Built the poller path that reads enabled tracked players, batches GameTools stats requests, stores raw JSON snapshots, normalizes global fields, and dedupes identical payloads with a raw hash.',
                'Built match candidate detection from aggregate stat deltas. Since there is no direct match-ended event, the worker compares snapshots and looks for meaningful changes like increased matches played.',
                'Built the boundary between tracker candidates and verified platform records. A detected match is evidence, not truth.',
                'Built platform data paths for linked identities, review candidates, canonical matches, match results, leaderboards, portal applications, API keys, and scopes.',
                'Built frontend surfaces for public player pages, leaderboards, developer portal flows, and operator review.'
            ],
            personalBuildCards: [],
            technicalChallenges: [
                'The tracker has to infer activity from totals. If matchesPlayed increases between snapshots, something happened, but the provider does not hand over a clean match object. The system has to treat that as a candidate, not a final result.',
                'Display names are terrible identifiers because they change. The system tracks persona IDs, nucleus IDs, linked platform accounts, and user-game identity relationships instead of treating nicknames as the source of truth.',
                'The review flow exists because detected data and verified data are different things. Operators need to compare tracker candidates with scheduled matches, reports, participants, and expected activity before publishing results.',
                'Snapshot storage grows quickly. Raw JSON is useful for audit and debugging, but long-term reads need indexes, retention rules, normalized fields, and eventually aggregation.',
                'Public users, API consumers, operators, and internal services need different boundaries. The platform API publishes canonical records; raw tracker internals stay out of the customer-facing contract.'
            ],
            links: [{ href: 'https://stat-forge.fiberhostingservices.com/', label: 'Live product (StatForge.gg)' }]
        }
    },
    {
        slug: 'fiber-hosting',
        title: 'Fiber Hosting',
        subtitle: 'Hosting control plane for websites, applications, and infrastructure',
        proofBadge: 'Infrastructure',
        description:
            'A customer dashboard and control-plane API for requesting hosted sites, domains, FTP/SFTP access, backups, billing, support, and application deployments while automation handles the infrastructure changes.',
        icon: '⚡',
        tech: ['Blazor Server', 'FastAPI', 'PostgreSQL', 'GitHub Actions', 'Terraform', 'Ansible', 'Kubernetes', 'Vault'],
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
                'Fiber Hosting is a hosting control plane. Customers use a dashboard instead of SSH sessions, Kubernetes manifests, DNS records, firewall rules, or manual server administration. The dashboard records what the customer wants, the API validates ownership and state, and infrastructure automation applies the change.',
            whatItIs:
                'There are three main layers: a Blazor Server dashboard, a FastAPI control-plane API, and an infrastructure automation layer. The dashboard handles user interaction. FastAPI owns authentication, authorization, product state, provisioning requests, billing records, support data, monitoring information, and infrastructure dispatch. Postgres stores customer accounts, product records, provisioning state, domains, backups, billing information, and dashboard data.',
            problem:
                'The difficult part is not serving web pages. The difficult part is coordinating infrastructure changes safely. Site creation, DNS updates, FTP provisioning, certificate issuance, storage creation, and deployment automation all take time and can fail partway through. The platform needs to track provisioning state, keep ownership boundaries intact, manage secrets, coordinate automation systems, and keep the dashboard in sync with the real environment.',
            diagramTitle: 'Hosting control plane',
            diagramSteps: [
                { title: 'Browser', detail: 'Customer dashboard' },
                { title: 'Blazor Server', detail: 'SignalR UI session' },
                { title: 'FastAPI', detail: 'Auth, state, dispatch' },
                { title: 'Postgres', detail: 'Control-plane state' },
                { title: 'GitHub Actions', detail: 'Async workflows' },
                { title: 'Terraform / Ansible', detail: 'Provision and configure' },
                { title: 'Kubernetes / VMs', detail: 'Customer workloads' }
            ],
            diagramNote:
                'The API records intent and dispatches automation. Long-running infrastructure work happens outside the request path.',
            architectureIntro:
                'When a user opens the dashboard, the browser connects to the Blazor Server frontend. Most component execution happens on the .NET server over a SignalR connection at /_blazor. Dashboard components call the FastAPI backend for data and actions. FastAPI authenticates the request, checks ownership, updates Postgres, and either returns immediately or queues infrastructure work.',
            hideArchitectureBlock: true,
            architecture: `Browser
   |
   v
Blazor Server Dashboard
   |
   v
FastAPI Control Plane
   |
   +------------------+
   |                  |
   v                  v
Postgres           GitHub Actions
Control State          |
                       v
              Terraform / Ansible
                       |
                       v
          Kubernetes / Virtual Machines
                       |
                       v
              Customer Workloads`,
            stackNotes:
                'The control plane manages users, authentication, billing, domains, backups, support requests, product records, provisioning status, monitoring data, and infrastructure requests. The data plane contains hosted websites, application containers, Kubernetes deployments, services, ingresses, persistent storage, databases, FTP/SFTP users, DNS records, TLS certificates, and virtual machines. Terraform defines Kubernetes resources, ingress rules, storage, DNS records, hosting workloads, and tenant deployment resources. Ansible handles host setup, hardening, FTP users, database users, monitoring installation, and security tooling. Vault stores infrastructure credentials, FTP credentials, database credentials, API secrets, and deployment secrets.',
            personalBuild: [
                'Built the dashboard and control-plane shape for hosted sites, domains, backups, billing, support, monitoring, FTP/SFTP access, and deployment actions.',
                'Built the FastAPI backend paths that validate ownership, update product state, create provisioning records, and dispatch infrastructure automation.',
                'Built the asynchronous provisioning pattern with GitHub Actions, Terraform, and Ansible so infrastructure changes do not run inside API requests.',
                'Built site provisioning flows for records, queued state, workflow dispatch, Kubernetes resources, DNS, TLS, storage, Vault secrets, and status updates.',
                'Built FTP/SFTP provisioning flows that create accounts, apply filesystem restrictions, generate credentials, store them in Vault, and return completion status to the dashboard.'
            ],
            technicalChallenges: [
                'The API cannot block while infrastructure changes run. Provisioning has to create state, dispatch work, and let the dashboard poll status until the workflow finishes.',
                'Customer-facing product state and infrastructure state have to stay separate. The dashboard should show progress without exposing Terraform details, secrets, host paths, or internal credentials.',
                'Secrets cannot live in source code, container images, or dashboard state. Vault owns infrastructure credentials, FTP credentials, database credentials, API secrets, and deployment secrets.',
                'Security spans several layers: bcrypt password hashing, JWT bearer authentication, HttpOnly cookies, token revocation, owner-scoped database filtering, CSP, HSTS, frame protections, Fail2Ban, UFW, Suricata, auditd, Kubernetes RBAC, and Kubernetes audit logging.',
                'Some areas still need hardening before production use: consistent CSRF enforcement, standardized auth helpers, hashed API keys and reset tokens, stricter migrations, rate limiting, and more durable retry handling for provisioning state.'
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
            'A lead queue built from public hiring pages. It ingests careers and ATS URLs, keeps the evidence, dedupes company opportunities, and scores outreach priority with deterministic rules.',
        icon: '🎯',
        tech: ['React', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Web ingestion', 'Deterministic scoring'],
        image: leadConsoleHeroShot,
        demoLink: 'https://lead.fiberhostingservices.com/',
        repoLink: null,
        screenshots: [leadConsoleHeroShot],
        caseStudy: {
            summary:
                'Lead Console helps recruiters find companies that are already showing hiring intent. A careers page can reveal what roles a company needs, how urgently they are hiring, and whether they are adding engineering capacity. The main workflow starts when someone submits a careers or ATS URL. The API fetches the page, extracts hiring evidence, dedupes the company opportunity, stores enrichment JSON, and queues deterministic scoring. The review console then shows ranked leads with evidence, contact intent, workflow status, and outreach actions.',
            whatItIs:
                'The app has three main parts: ingest, scoring, and review. Ingest handles manual leads, careers-page discovery, and public URL ingestion. Scoring looks for deterministic signals like ATS host, employer slug, careers URL confidence, repeated engineering titles, infrastructure keywords, page text size, and transformation language. Review gives the recruiter a queue of scored company opportunities instead of a pile of raw job links.',
            problem:
                'Recruiters do not just need a list of companies. They need timing. If a company is hiring backend, platform, SRE, DevOps, cloud, security, or infrastructure roles, that can be a sign that the team is growing or under delivery pressure. Public hiring pages are messy, though. ATS hosts are shared across many companies, pages change structure, some sites block requests, and multiple job URLs can belong to the same company. Lead Console keeps the evidence, merges duplicates carefully, and scores the company opportunity instead of treating every job page as a separate lead.',
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
                'A submitted URL is normalized and SSRF-validated before the API fetches it. The ingest path extracts title, metadata, body text, company and domain hints, ATS identity, and hiring keywords. If the URL or company identity already exists, the lead is refreshed or merged. Otherwise, the API creates a lead and publishes a lead_created event for the worker.',
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
                'FastAPI owns auth, ingest, careers discovery, dedupe, workflow actions, queue publication, and CSV export. Postgres stores leads, enrichment JSONB, users, sessions, and audit events. Redis carries scoring events with RPUSH and BLPOP. A Python worker computes scores, contact intent, and outreach context. React renders the lead queue, filters, detail drawer, ingest drawer, and workflow actions.',
            personalBuild: [
                'Built the ingest path for public careers and ATS URLs: URL normalization, SSRF validation, page fetching, boilerplate stripping, metadata extraction, and enrichment storage.',
                'Built deterministic scoring rules for hiring intent, role-family signals, ATS identity, repeated engineering titles, infrastructure keywords, page confidence, and transformation language.',
                'Built company-level dedupe across exact URLs, registrable domains, website hosts, emails, company/contact identity, and multi-tenant ATS boards like Lever, Greenhouse, Ashby, and Workable.',
                'Built the Redis worker flow so ingest can queue scoring work without blocking the review console.',
                'Built the recruiter workflow surface: ranked leads, filters, lead detail evidence, contact intent, review status, outreach actions, and CSV export.'
            ],
            technicalChallenges: [
                'Dedupe is easy to get wrong on ATS pages. Two Ashby or Greenhouse URLs can share the same host and still belong to different companies, so the merge logic checks ATS board identity and employer slugs instead of merging by domain alone.',
                'The score has to explain itself. Recruiters need to see why a company is worth contacting, so the lead keeps keywords, evidence, enrichment data, contact-intent reasoning, and audit events.',
                'Public web ingestion fails in ordinary ways: 403s, 404s, 429s, timeouts, changed markup, thin pages, ATS redirects, and repeated re-ingests. The API maps those failures into structured states instead of treating them as generic crashes.',
                'The app is company/opportunity-centric, not job-posting-centric. Multiple job URLs for the same company collapse into one lead while keeping merged source URLs and combined signal evidence.',
                'The first scaling pressure would be the review query and queue reliability: pagination, stronger database constraints, indexed workflow filters, durable queue recovery, scheduled re-crawls, and normalized signal columns where JSONB queries get too expensive.'
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
