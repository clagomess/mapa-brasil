# mapa-brasil

## Instalação
```
npm install mapa-brasil
```

Ou

Download de `mapa-brasil.min.js` na página de [releases](https://github.com/clagomess/mapa-brasil/releases/latest).

## Uso
### Html
```html
<div id="mapa" style="height: 600px; width: 600px"></div>

<script type="text/javascript" src="mapa-brasil.min.js"></script>
<script type="text/javascript">
    window.onload = function () {
        MapaBrasil(document.getElementById('mapa'), {});
    }
</script>
```

### Javascript
```javascript
// @TODO: Implements
```

### Typescript
```typescript
import {Component} from '@angular/core';
import mapaBrasil from 'mapa-brasil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class IndicadorComponent {
  carregarMapa(){
    mapaBrasil(document.getElementById('mapa'), {})
  }
}
```


## Documentação
### Main
`MapaBrasil(element: HTMLElement, options: Options)`

### Options
Atributo | Tipo | Valor Padrão | Descrição
-------- | ---- | ------------ | ---------------
dataPath | `string` | `'/data'` | URL dos assets
unidade | `string`, `number` | `'br'` | Cód. IBGE ou sigla da UF. Ex.: `52`, `'df'`
regiao | `string` | `'federacao'` | Valores permitidos:  `'mesorregiao'`, `'microregiao'`, `'municipio'`, `'federacao'`
defaultFillColor | `string` | `'#FFF3E3'` | -
defaultStrokeColor | `string` | `'#1F1A17'` | -
unidadeData | `Array`, `Promise` | - | -
onClick | `function` | - | -

## Exemplos

```
//@TODO: Implements
```
