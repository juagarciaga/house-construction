interface Translation {
    [key: string]: string;
}

interface Translations {
    pt: Translation;
}

export const eventsTranslate: Translations = {
    'pt': {
        "provider": "Fornecedor",
        "ccoMaterial": "Material",
        "clasification": "Classifição",
        "note": "Nota Fiscal",
        "createdDate": "Emissão",
        "value": "Valor",
        "expiredDate": "Vencimento",
        "paymentType": "Forma de pagamento",
        "obs": "OBS:",
        "week": "Romaneio No.",
        "weeks": "Romaneios",
        "metrics": "Métricas",
        "month": "Romaneio do mês",
        "year": "Romaneio do ano",
        "isInRomaneio": "Faz parte do romaneio",
        "selectFilter": "Selecione un filtro",
        "progressbyConstruction": "Obra",
        "progressbyMoney": "Dinheiro usado",
    }
}
