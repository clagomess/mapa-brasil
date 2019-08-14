"use strict";

module.exports = {
  IS_NODE: (typeof window === "undefined"),
  listUfSigla: [
    "br",
    "ac", "al", "am", "ap",
    "ba", "ce", "df", "es",
    "go", "ma", "mg", "ms",
    "mt", "pa", "pb", "pe",
    "pi", "pr", "rj", "rn",
    "ro", "rr", "rs", "sc",
    "se", "sp", "to"
  ],

  codIbgeEstadoToSigla: {
    12:	"ac", 13:	"am", 14:	"rr", 11:	"ro",
    15:	"pa", 16:	"ap", 17:	"to", 21:	"ma",
    22:	"pi", 23:	"ce", 24:	"rn", 25:	"pb",
    26:	"pe", 27:	"al", 28:	"se", 29:	"ba",
    31:	"mg", 32:	"es", 33:	"rj", 35:	"sp",
    41:	"pr", 42:	"sc", 43:	"rs", 50:	"ms",
    51:	"mt", 52:	"go", 53:	"df",
  },

  codIbgeAttr: {
    "federacao": "CD_GEOCUF",
    "mesorregiao": "CD_GEOCME",
    "microrregiao": "CD_GEOCMI",
    "municipio": "CD_GEOCMU",
  },

  nomeUnidadeAttr: {
    "federacao": "NM_ESTADO",
    "mesorregiao": "NM_MESO",
    "microrregiao": "NM_MICRO",
    "municipio": "NM_MUNICIP",
  },

  mapPath: {
    "mesorregiao": "mesorregioes",
    "microrregiao": "microrregioes",
    "municipio": "municipios",
    "federacao": "federacao",
  },

  css: `
  .mapa-brasil .loader{
        position: absolute;
        z-index: 3000;
        top: calc(50% - 7px);
        left: calc(50% - 7px);
        width: 14px;
        height: 14px;
        border: solid 2px transparent;
        border-top-color: #29d;
        border-left-color: #29d;
        border-radius: 10px;
        -webkit-animation: pace-spinner 400ms linear infinite;
        -moz-animation: pace-spinner 400ms linear infinite;
        -ms-animation: pace-spinner 400ms linear infinite;
        -o-animation: pace-spinner 400ms linear infinite;
        animation: pace-spinner 400ms linear infinite;
    }

    @-webkit-keyframes pace-spinner {
        0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
    }
    @-moz-keyframes pace-spinner {
        0% { -moz-transform: rotate(0deg); transform: rotate(0deg); }
        100% { -moz-transform: rotate(360deg); transform: rotate(360deg); }
    }
    @-o-keyframes pace-spinner {
        0% { -o-transform: rotate(0deg); transform: rotate(0deg); }
        100% { -o-transform: rotate(360deg); transform: rotate(360deg); }
    }
    @-ms-keyframes pace-spinner {
        0% { -ms-transform: rotate(0deg); transform: rotate(0deg); }
        100% { -ms-transform: rotate(360deg); transform: rotate(360deg); }
    }
    @keyframes pace-spinner {
        0% { transform: rotate(0deg); transform: rotate(0deg); }
        100% { transform: rotate(360deg); transform: rotate(360deg); }
    }
  `
};
