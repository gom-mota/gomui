Este é um componente que permite a expansão/recolhimento de um determinado conteúdo.

## title

Texto que será exibido no cabeçalho.

<gom-preview>
    <gom-accordion title='title'>
        <p>content</p>
    </gom-accordion>
</gom-preview>

## is-open

Estado de aberto/fechado.

<gom-preview>
    <gom-accordion title='default opened' is-open>
        <p>content</p>
    </gom-accordion>
</gom-preview>

## children

Conteúdo principal que será exibido ao expandir o componente.

## description <span class='slot-badge'>slot</span>

Conteúdo "extra" que será exibido inicialmente no cabeçalho e, ao expandir o componente, aparecerá antes do conteúdo principal.

<gom-preview>
    <gom-accordion title='with description'>
        <p>content</p>
        <div slot='description'>description</div>
    </gom-accordion>
    <gom-accordion title='with another description' is-open>
        <p>content</p>
        <div slot='description'>
            <span>another description 1</span>
            <span style="color:#a2a2a2">another description 2</span>
        </div>
    </gom-accordion>
</gom-preview>
