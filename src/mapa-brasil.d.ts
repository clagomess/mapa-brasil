// Type definitions for MapaBrasil

declare function MapaBrasil(element: HTMLElement, options: {
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
    onClick?: (data: {codIbge: number, nomUnidade: string}) => void
});
