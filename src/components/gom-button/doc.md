Este é um botão simples que aciona uma função de retorno ao ser clicado.

## label

Texto que será exibido dentro do botão.

## color

Cor de destaque.

<div>
<gom-color color="#e0ff8b" text='default'></gom-color>
<gom-color color="#ffa58b" text='alert'></gom-color>
</div>

## variant

Aparência do botão. Pode ser utilizado para diferenciar ações em tela.

<gom-preview>
    <div>
        <gom-button label="Primary"></gom-button>
        <gom-button label="Secondary" variant="secondary"></gom-button>
        <gom-button label="Text" variant="text"></gom-button>
    </div>
    <div>
        <gom-button label="Primary" color="alert"></gom-button>
        <gom-button label="Secondary" variant="secondary" color="alert"></gom-button>
        <gom-button label="Text" variant="text" color="alert"></gom-button>
    </div>
</gom-preview>

## disabled

Estado de desabilitado do botão.

<gom-preview>
    <div>
        <gom-button label="Primary" disabled="true"></gom-button>
        <gom-button label="Secondary" variant="secondary" disabled="true"></gom-button>
        <gom-button label="Text" variant="text" disabled="true"></gom-button>
    </div>
    <div>
        <gom-button label="Primary" color="alert" disabled="true"></gom-button>
        <gom-button label="Secondary" variant="secondary" color="alert" disabled="true"></gom-button>
        <gom-button label="Text" variant="text" color="alert" disabled="true"></gom-button>
    </div>
</gom-preview>

## onClick

Callback chamado ao clicar no botão
