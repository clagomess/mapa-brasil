# mapa-brasil
![GitHub release](https://img.shields.io/github/release/clagomess/mapa-brasil)
![GitHub package.json version](https://img.shields.io/github/package-json/v/clagomess/mapa-brasil)
![Travis (.org)](https://img.shields.io/travis/clagomess/mapa-brasil)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/afa44e1b6c8b4e1c95bbe24ae2972937)](https://www.codacy.com/app/clagomess/mapa-brasil?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=clagomess/mapa-brasil&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/afa44e1b6c8b4e1c95bbe24ae2972937)](https://www.codacy.com/app/clagomess/mapa-brasil?utm_source=github.com&utm_medium=referral&utm_content=clagomess/mapa-brasil&utm_campaign=Badge_Coverage)

## Instalação
```
npm install mapa-brasil
```

Ou download de `mapa-brasil.min.js` na página de [releases](https://github.com/clagomess/mapa-brasil/releases/latest).

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
const mapaBrasil = require('mapa-brasil');

mapaBrasil(document.getElementById('mapa'), {})
```

### Typescript
```typescript
import {Component} from '@angular/core';
import mapaBrasil from 'mapa-brasil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
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
unidade | <ul><li>`string`</li><li>`number`</li></ul> | `'br'` | Cód. IBGE ou sigla da UF. Ex.: `52`, `'df'`
regiao | `string` | `'federacao'` | Valores permitidos:  <ul><li>`'mesorregiao'`</li><li>`'microrregiao'`</li><li>`'municipio'`</li><li>`'federacao'`</li></ul> 
defaultFillColor | `string` | `'#FFF3E3'` | -
defaultStrokeColor | `string` | `'#1F1A17'` | -
unidadeData | <ul><li>`Array`</li><li>`Promise`</li></ul>  | - | -
onClick | `function` | - | Ex.: `(data) => {}`

## Exemplos
Mais exemplos podem ser vistos em `index.html` no repositório.

### Personalização
```javascript
MapaBrasil(document.getElementById('mapa'), {
    unidadeData: [
        {codIbge: 52, fillColor: '#d82b40'},
        {codIbge: 43, fillColor: '#d82b40'},
        {codIbge: 11, fillColor: '#ffa700', strokeColor: '#008744', strokeWidth: 4},
    ],
    onClick: function (data) {console.log(data)}
});
```

![Exemplo 001](https://raw.githubusercontent.com/clagomess/mapa-brasil/master/exemplos/exemplo_001.png)

### Brasil -> Município
```javascript
MapaBrasil(document.getElementById('mapa'), {
    onClick: function (data) {
        MapaBrasil(document.getElementById('mapa'), {
            unidade: data.codIbge,
            regiao: 'municipio',
            onClick: function (data) {
                console.log(data)
            }
        });
    }
});
```

![Exemplo 002](https://raw.githubusercontent.com/clagomess/mapa-brasil/master/exemplos/exemplo_002.png)
