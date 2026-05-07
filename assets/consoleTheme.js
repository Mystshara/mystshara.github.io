/**
 * Premium "operator console" tokens — single accent + cyan support + depth layers.
 * Dark-first; light uses real surfaces (not flat white).
 */

export function consoleTokens(darkMode) {
    if (darkMode) {
        return {
            bgDeep: '#060816',
            bgMid: '#0B1020',
            bgElevated: '#10182B',
            surface1: '#111827',
            surface2: '#162033',
            surface3: '#1A2638',
            glass: 'rgba(17, 24, 39, 0.72)',
            glassRgb: '17, 24, 39',
            borderSubtle: 'rgba(255, 255, 255, 0.06)',
            borderLift: 'rgba(79, 140, 255, 0.28)',
            accent: '#4F8CFF',
            accentRgb: '79, 140, 255',
            support: '#22D3EE',
            warn: '#F59E0B',
            textPrimary: '#F3F4F6',
            textSecondary: '#94A3B8',
            textMuted: '#64748B',
            heroAmbient:
                'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.15) 0%, transparent 42%), radial-gradient(circle at 100% 0%, rgba(34,211,238,0.10) 0%, transparent 40%), #060816',
            sectionHeroFoot: '#0B1020',
            sectionProof: '#0B1020',
            sectionAbout: '#060816',
            sectionSystems: '#10182B',
            shadowCard: '0 10px 30px rgba(0, 0, 0, 0.35)',
            shadowLift: '0 20px 44px rgba(0, 0, 0, 0.45)',
            shadowAccent: '0 18px 42px rgba(79, 140, 255, 0.14)',
            diagramGlow: '0 0 48px rgba(79, 140, 255, 0.12), 0 16px 40px rgba(0, 0, 0, 0.4)'
        };
    }
    return {
        bgDeep: '#F5F7FB',
        bgMid: '#F5F7FB',
        bgElevated: '#EEF2FF',
        surface1: '#FFFFFF',
        surface2: '#FFFFFF',
        surface3: '#EEF2FF',
        glass: 'rgba(255, 255, 255, 0.85)',
        glassRgb: '255, 255, 255',
        borderSubtle: '#DCE3F0',
        borderLift: 'rgba(59, 130, 246, 0.35)',
        accent: '#3B82F6',
        accentRgb: '59, 130, 246',
        support: '#0891B2',
        warn: '#D97706',
        textPrimary: '#0F172A',
        textSecondary: '#334155',
        textMuted: '#64748B',
        heroAmbient:
            'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.08) 0%, transparent 45%), radial-gradient(circle at 100% 0%, rgba(34,211,238,0.06) 0%, transparent 42%), #F5F7FB',
        sectionHeroFoot: '#F5F7FB',
        sectionProof: '#F5F7FB',
        sectionAbout: '#EEF2FF',
        sectionSystems: '#F5F7FB',
        shadowCard: '0 10px 36px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',
        shadowLift: '0 20px 48px rgba(15, 23, 42, 0.12)',
        shadowAccent: '0 16px 40px rgba(59, 130, 246, 0.12)',
        diagramGlow: '0 12px 40px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(15, 23, 42, 0.06)'
    };
}

export function glassSurfaceStyle(darkMode, tokens) {
    return {
        background: tokens.glass,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${tokens.borderSubtle}`,
        boxShadow: tokens.shadowCard
    };
}

/** Single consistent proof badge — accent tint, not rainbow categories. */
export function proofBadgeStyle(darkMode, tokens) {
    const { accentRgb } = tokens;
    return darkMode
        ? {
              background: `rgba(${accentRgb}, 0.12)`,
              color: '#93C5FD',
              border: `1px solid rgba(${accentRgb}, 0.22)`
          }
        : {
              background: `rgba(${accentRgb}, 0.1)`,
              color: '#1D4ED8',
              border: `1px solid rgba(${accentRgb}, 0.26)`
          };
}
