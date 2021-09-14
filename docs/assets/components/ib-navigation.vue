<template>
    <v-list nav dense>
       <div v-for="(link, i) in links" :key="i">

        <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
        >
            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
                {{ link.text }}
            </v-list-item>

            <v-list-group
                v-else
                :key="link.text"
                no-action
                :prepend-icon="link.icon"
                :value="false"
            >
                <template v-slot:activator>
                <v-list-item-title>{{ link.text }}</v-list-item-title>
                </template>

                <v-list-item
                    v-for="sublink in link.subLinks"
                    :to="sublink.to"
                    :key="sublink.text"
                >
                    <v-list-item-icon v-if="sublink.icon">
                        <v-icon>{{ sublink.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ sublink.text }}</v-list-item-title>

                </v-list-item>

            </v-list-group>

        </div>

    </v-list>
</template>

<script>
module.exports = {
    data: function() {
        return {
            links: [
                {
                    to       : '/',
                    icon     : 'mdi-repeat',
                    text     : 'Миграция',
                },
                {
                    to       : '/',
                    icon     : 'mdi-tune',
                    text     : 'Управление услугами',
                },
                {
                    to       : '/',
                    icon     : 'mdi-file-document-box-outline',
                    text     : 'Выписка',
                },
                {
                    to       : '/',
                    icon     : 'mdi-account-check-outline',
                    text     : 'Проверка контрагентов',
                },
                {
                    icon     : 'mdi-currency-rub',
                    text     : 'Рублевые документы',
                    subLinks : [
                        {
                            text : 'Платежное поручение',
                            to    : '/apps',
                        },
                        {
                            text : 'Заявка на наличные',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-currency-usd',
                    text     : 'Валютные документы',
                    subLinks : [
                        {
                            text : 'Перевод валюты',
                            to    : '/apps',
                        },
                        {
                            text : 'Покупка валюты',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-file-document-box-search-outline',
                    text     : 'Валютный контроль',
                    subLinks : [
                        {
                            text : 'Контракты (кредитные договоры)',
                            to    : '/apps',
                        },
                        {
                            text : 'Декларации на товары',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-timer-sand',
                    text     : 'Постоянные поручения',
                    subLinks : [
                        {
                            text : 'Договоры',
                            to    : '/apps',
                        },
                        {
                            text : 'Оформление поручения',
                            to    : '/apps',
                        },
                        {
                            text : 'Отмена поручения',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-shape-square-plus',
                    text     : 'Дополнительные документы',
                    subLinks : [
                        {
                            text : 'Отзывы документов',
                            to    : '/apps',
                        },
                        {
                            text : 'Подключение услуг',
                            to    : '/apps',
                        },
                        {
                            text : 'Сведения о физическом лице',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-email-outline',
                    text     : 'Письма',
                    subLinks : [
                        {
                            text : 'Входящие',
                            to    : '/apps',
                        },
                        {
                            text : 'Исходящие',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-percent-outline',
                    text     : 'Кредиты',
                    subLinks : [
                        {
                            text : 'Предоставленные кредиты',
                            to    : '/apps',
                        },
                        {
                            text : 'Получение транша',
                            to    : '/apps',
                        },
                        {
                            text : 'Досрочное погашение',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    to       : '/',
                    icon     : 'mdi-file-document-box-check-outline',
                    text     : 'Гарантии',
                },
                {
                    icon     : 'mdi-clock-outline',
                    text     : 'Депозиты',
                    subLinks : [
                        {
                            text : 'Размещенные депозиты',
                            to    : '/apps',
                        },
                        {
                            text : 'Размещенные НСО',
                            to    : '/apps',
                        },
                        {
                            text : 'Открытие депозита',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-credit-card-outline',
                    text     : 'Карты',
                    subLinks : [
                        {
                            text : 'Пополнение карт',
                            to    : '/apps',
                        },
                        {
                            text : 'Выпущенные карты',
                            to    : '/apps',
                        },
                        {
                            text : 'Выписка',
                            to    : '/apps',
                        },
                        {
                            text : 'Заявления',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-wallet-outline',
                    text     : 'Зарплатный проект',
                    subLinks : [
                        {
                            text : 'Зарплатный реестр',
                            to    : '/apps',
                        },
                        {
                            text : 'Управление сотрудниками',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-play-outline',
                    text     : 'Система быстрых платежей',
                    subLinks : [
                        {
                            text : 'Операции',
                            to    : '/apps',
                        },
                        {
                            text : 'QR-коды',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-cart-outline',
                    text     : 'Эквайринг',
                    subLinks : [
                        {
                            text : 'Отчет',
                            to    : '/apps',
                        },
                        {
                            text : 'Аналитика',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-briefcase-outline',
                    text     : 'Бюджетирование',
                    subLinks : [
                        {
                            text : 'Справочник статей',
                            to    : '/apps',
                        },
                        {
                            text : 'Бюджетная роспись',
                            to    : '/apps',
                        },
                    ]
                },
                {
                    icon     : 'mdi-file-document-box-multiple-outline',
                    text     : 'Договоры',
                    subLinks : [
                        {
                            text : 'Справочник статей',
                            to    : '/apps',
                        },
                        {
                            text : 'Бюджетная роспись',
                            to    : '/apps',
                        },
                    ]
                },
            ]
        }
    }
}
</script>

<style>

</style>