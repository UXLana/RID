/**
 * Microsoft Dark Theme
 *
 * A "Microsoft Teams"-inspired neutral dark palette.
 * Brand accent: #5AAE90 (bright green) for buttons, active states, links.
 * Surfaces: neutral grays (#1B1B1B → #1F1F1F → #2D2D2D → #3B3B3B)
 *
 * DS components reference `onLight` tokens for their primary surfaces.
 * We map dark values INTO the `onLight` slots so components render dark
 * without any CSS overrides.
 */

import type { ProductTheme } from '@/styles/themes/theme-interface'
import { ridTheme } from '@/styles/themes'

export const microsoftDarkTheme: ProductTheme = {
  ...ridTheme,
  name: 'Microsoft-Dark',
  colors: {
    brand: {
      default: '#5AAE90',
      darker: '#4A9A7E',
      lighter: '#6EC4A4',
    },

    accent: {
      default: '#D49558',
      darker: '#B87333',
      lighter: '#E0A870',
    },

    surface: {
      light: '#1F1F1F',
      lightDarker: '#1B1B1B',
      dark: '#2D2D2D',
      darkDarker: '#1B1B1B',
      disabled: {
        onLight: 'rgba(255, 255, 255, 0.05)',
        onDark: 'rgba(255, 255, 255, 0.20)',
      },
      info: 'rgba(60, 120, 180, 0.15)',
      success: 'rgba(90, 174, 144, 0.15)',
      warning: 'rgba(209, 118, 0, 0.15)',
      important: 'rgba(220, 12, 34, 0.15)',
    },

    surfaceBorder: {
      info: '#3E5570',
      success: '#2D5E4D',
      warning: '#6E4A1A',
      important: '#6E2A30',
    },

    text: {
      highEmphasis: {
        onLight: '#FFFFFF',
        onDark: '#FFFFFF',
      },
      lowEmphasis: {
        onLight: '#D1D1D1',
        onDark: 'rgba(255, 255, 255, 0.70)',
      },
      disabled: {
        onLight: 'rgba(255, 255, 255, 0.30)',
        onDark: 'rgba(255, 255, 255, 0.30)',
      },
      action: {
        enabled: '#5AAE90',
        hover: '#6EC4A4',
        active: '#4A9A7E',
      },
      success: '#5AAE90',
      warning: '#E89D3E',
      important: '#F06E7A',
    },

    border: {
      lowEmphasis: {
        onLight: '#3E3E3E',
        onDark: 'rgba(255, 255, 255, 0.10)',
        hover: {
          onLight: '#555555',
          onDark: 'rgba(255, 255, 255, 0.27)',
        },
      },
      midEmphasis: {
        onLight: '#484848',
        onDark: 'rgba(255, 255, 255, 0.15)',
      },
      highEmphasis: {
        onLight: '#606060',
        onDark: 'rgba(255, 255, 255, 0.43)',
      },
    },

    icon: {
      enabled: {
        onLight: '#D1D1D1',
        onDark: 'rgba(255, 255, 255, 0.94)',
      },
      hover: {
        onLight: '#E0E0E0',
      },
      active: {
        onLight: '#FFFFFF',
      },
      selected: {
        onLight: '#FFFFFF',
      },
      disabled: {
        onLight: 'rgba(255, 255, 255, 0.20)',
        onDark: 'rgba(255, 255, 255, 0.20)',
      },
      lowEmphasis: {
        enabled: {
          onLight: '#A1A1A1',
          onDark: 'rgba(255, 255, 255, 0.65)',
        },
      },
    },

    iconBg: {
      info: 'rgba(60, 120, 180, 0.20)',
      info_onDark: 'rgba(60, 120, 180, 0.25)',
      success: 'rgba(90, 174, 144, 0.20)',
      success_onDark: 'rgba(0, 173, 130, 0.25)',
      warning: 'rgba(230, 130, 0, 0.20)',
      warning_onDark: 'rgba(230, 130, 0, 0.25)',
      important: 'rgba(248, 104, 118, 0.20)',
      important_onDark: 'rgba(248, 104, 118, 0.25)',
    },

    action: {
      enabled: '#5AAE90',
      hover: '#4A9A7E',
      active: '#3D8A6E',
      important: {
        enabled: '#F06E7A',
        hover: '#E05565',
        active: '#D04050',
      },
      monochrome: {
        onLight: {
          enabled: 'rgba(255, 255, 255, 0.70)',
          hover: 'rgba(255, 255, 255, 0.85)',
          active: 'rgba(255, 255, 255, 1)',
          selected: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(255, 255, 255, 0.20)',
          bg: 'rgba(255, 255, 255, 0.08)',
          lowEmphasis: {
            enabled: 'rgba(255, 255, 255, 0.55)',
          },
        },
        onDark: {
          enabled: 'rgba(255, 255, 255, 0.94)',
          hover: 'rgba(255, 255, 255, 1)',
          active: 'rgba(255, 255, 255, 1)',
          selected: 'rgba(255, 255, 255, 1)',
          disabled: 'rgba(255, 255, 255, 0.20)',
          bg: 'rgba(255, 255, 255, 0.09)',
          lowEmphasis: {
            enabled: 'rgba(255, 255, 255, 0.65)',
          },
        },
      },
    },

    status: {
      info: '#5B9BD5',
      info_onDark: 'rgba(60, 120, 180, 0.25)',
      success: '#5AAE90',
      success_onDark: 'rgba(0, 173, 130, 0.25)',
      warning: '#E89D3E',
      warningLight: '#6E4A1A',
      warning_onDark: 'rgba(230, 130, 0, 0.25)',
      important: '#F06E7A',
      important_onDark: 'rgba(248, 104, 118, 0.25)',
    },

    badge: {
      info: '#6BA3D6',
      infoLight: 'rgba(60, 120, 180, 0.20)',
      success: '#5AAE90',
      successLight: 'rgba(90, 174, 144, 0.20)',
      warning: '#E89D3E',
      important: '#F06E7A',
      importantLight: 'rgba(248, 104, 118, 0.20)',
      aqua: '#4BB8CC',
      aquaLight: 'rgba(22, 127, 146, 0.20)',
      green: '#6DBF4A',
      greenLight: 'rgba(64, 133, 30, 0.20)',
      yellow: '#C9A830',
      yellowLight: 'rgba(143, 111, 0, 0.20)',
      fuschia: '#E060CC',
      fuschiaLight: 'rgba(207, 38, 184, 0.20)',
      purple: '#B980E8',
      purpleLight: 'rgba(161, 76, 225, 0.20)',
      charcoal: '#A1A1A1',
      charcoalLight: 'rgba(74, 85, 82, 0.20)',
    },
    avatar: { ...ridTheme.colors.avatar },
    dataViz: { ...ridTheme.colors.dataViz },
    cvd: { ...ridTheme.colors.cvd },

    hover: {
      onLight: '#3B3B3B',
      onDark: 'rgba(255, 255, 255, 0.15)',
    },

    selected: {
      onLight: '#3B3B3B',
    },

    selectedHighlight: 'rgba(90, 174, 144, 0.15)',
    selectedHighlight_hover: 'rgba(90, 174, 144, 0.25)',

    focusBorder: {
      onLight: '#5AAE90',
      onDark: 'rgba(255, 255, 255, 0.65)',
    },

    scrim: 'rgba(0, 0, 0, 0.50)',

    scrollbar: {
      enabled: { onLight: '#484848', onDark: 'rgba(255, 255, 255, 0.43)' },
      hover: { onLight: '#606060', onDark: 'rgba(255, 255, 255, 0.58)' },
      active: { onLight: '#787878', onDark: 'rgba(255, 255, 255, 0.73)' },
    },

    navItemText: {
      enabled: { onLight: 'rgba(255, 255, 255, 0.72)', onDark: 'rgba(255, 255, 255, 0.88)' },
    },

    buttonToggleBg: {
      onLight: 'rgba(255, 255, 255, 0.08)',
      onDark: 'rgba(255, 255, 255, 0.08)',
    },

    chipBg: {
      enabled: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.13)',
    },

    progressIndicatorTrack: 'rgba(255, 255, 255, 0.15)',

    tableCellHighlight: {
      highEmphasis: '#5AAE90',
      midEmphasis: 'rgba(90, 174, 144, 0.20)',
    },

    grid: {
      finishedRowText: '#A1A1A1',
      packageIconColor: '#A1A1A1',
    },
  },

  elevation: {
    none: 'none',
    xs: '0px 1px 2px rgba(0, 0, 0, 0.20)',
    sm: '0px 1px 3px rgba(0, 0, 0, 0.30), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0px 4px 6px -1px rgba(0, 0, 0, 0.30), 0px 2px 4px -1px rgba(0, 0, 0, 0.24)',
    lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.30), 0px 4px 6px -2px rgba(0, 0, 0, 0.20)',
    xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.35), 0px 10px 10px -5px rgba(0, 0, 0, 0.20)',
    '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.50)',
    inner: 'inset 0px 2px 4px rgba(0, 0, 0, 0.25)',
    brand: '0px 4px 14px rgba(0, 0, 0, 0.35)',
    brandLg: '0px 10px 25px rgba(0, 0, 0, 0.45)',
  },
}
