// {{ ($vuetify.theme.dark) ? 'mdi-weather-night' : 'mdi-weather-sunny' }}

new Vue({
    el: "#app",
    data() {
        return {
            drawer: null,
            goDark: false,
            panel: [0, 1, 2, 3],

            bills: [
                '40702978400000000027',
                '40702978400000000028',
                '40802840900000005643',
                '40802840900000001122',
            ],
            currencies: [{
                    id: 0,
                    name: 'EUR'
                },
                {
                    id: 1,
                    name: 'USD'
                },
                {
                    id: 2,
                    name: 'RUB'
                }
            ],
            sale_amount: '1 000.00',
            purchase_amount: '1 180.00',
            commission_currency: 'EUR',
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
            menu: false,
            modal: false,
            document: {
                isSale: true,
                sale_currency: 0,
                purchase_currency: 1,
                bank: 'АО «ОТП Банк»',
                client: 'ООО «Демоклиент»',
                inn: '772312345678',
                okpo: '772312345678'
            }
        }
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },
    },
    methods: {
        calculatePurchase() {
            if (this.sale_amount == '') {
                this.purchase_amount = '0.00';
            } else {
                this.purchase_amount = (parseFloat(this.sale_amount.replace(/[^\d.-]/g, '')) * 1.18).toFixed(2);
            }

            this.formatCurrency('purchase_amount');
        },
        calculateSale() {
            console.log(this.purchase_amount);
            this.sale_amount = (parseFloat(this.purchase_amount) / 1.18).toFixed(2);
        },
        formatCurrency(num) {
            this[num] = this[num] + '';
            var number = this[num].replace(/[^\d.-]/g, '');
            var splitArray = number.split('.');
            var integer = splitArray[0];
            var mantissa = splitArray.length > 1 ? '.' + splitArray[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(integer)) {
                integer = integer.replace(rgx, '$1' + ' ' + '$2');
            }
            this[num] = integer + mantissa.substring(0, 3);
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}.${month}.${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#1976D2'
                },
            },
        },
    }),
    computed: {
        setTheme() {
            return this.$vuetify.theme.dark = this.goDark == true ? true : false;
        },
        themeIcon() {
            return this.$vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
        },
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
    }
});