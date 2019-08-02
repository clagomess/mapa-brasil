// Type definitions for MapaBrasil

type Options = {
  dataPath?: string,
  unidade?: string | number,
  regiao?: string,
  qualidade?: string,
  defaultFillColor?: string,
  defaultStrokeColor?: string,
  unidadeData?:
    {
      codIbge: number,
      fillColor: string,
    }[] |
    Promise<{
      codIbge: number,
      fillColor: string,
    }[]>
  onClick?: (data: { codIbge: number, nomUnidade: string }) => void
};

declare function MapaBrasil(element: HTMLElement, options: Options);

export default function (element: HTMLElement, options: Options);
