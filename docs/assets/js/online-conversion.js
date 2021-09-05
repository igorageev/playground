new Vue({
  el: "#app",
  data() {
    return {
      drawer: null,
      goDark: false,
      panel: [0, 1, 2, 3],
      currencyFilter: '',

      accounts: [
        {
          id: '40702978400000000027',
          amount: '7 065 691.38 €',
          target: 'расчетный',
          currency: 'EUR'
        },
        {
          id: '40702978400000000028',
          amount: '7 065 691.38 €',
          target: 'специальный',
          currency: 'EUR'
        },
        {
          id: '40702978400000000029',
          amount: '7 065 691.38 €',
          target: 'специальный',
          currency: 'EUR'
        },
        {
          id: '40802840900000005643',
          amount: '10 065 000.00 $',
          target: 'расчетный',
          currency: 'USD'
        },
        {
          id: '40802840900000003876',
          amount: '10 065 000.00 $',
          target: 'расчетный',
          currency: 'USD'
        },
        {
          id: '40802840900000001122',
          amount: '165 432.00 $',
          target: 'специальный',
          currency: 'USD'
        }
      ],

      currencies: [
        {
          id: 0,
          name: 'EUR',
          code: '978'
        },
        {
          id: 1,
          name: 'USD',
          code: '840'
        },
        {
          id: 2,
          name: 'RUB',
          code: '643'
        }
      ],
      menu: false,
      modal: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),

      doc: {
        sale_amount: '1 000.00',
        sale_currency: 0,
        purchase_amount: '1 180.00',
        purchase_currency: 1,
        commission_currency: 'EUR',
        rate: 1.18,
        isSale: true,
        bank: 'АО «ОТП Банк»',
        client: 'ООО «Демоклиент»',
        inn: '772312345678',
        okpo: '772312345678'
      }
    }
  },
  mounted() {
    document.getElementById('app').style.visibility = "visible";
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    changeCurrency(a) {
      //this.$router.push({path: a })
      this.currencyFilter = a;
      console.log(this.currencyFilter);
    },
    // Пересчитать сумму покупки
    calculatePurchase() {
      if (this.doc.sale_amount == '') {
        this.doc.purchase_amount = '0.00';
      } else {
        this.doc.purchase_amount = (parseFloat(this.doc.sale_amount.replace(/[^\d.-]/g, '')) * this.doc.rate).toFixed(2);
      }
      this.formatCurrency('purchase_amount');
    },
    // Пересчитать сумму продажи
    calculateSale() {
      if (this.doc.purchase_amount == '') {
        this.doc.sale_amount = '0.00';
      } else {
        this.doc.sale_amount = (parseFloat(this.doc.purchase_amount.replace(/[^\d.-]/g, '')) / this.doc.rate).toFixed(2);
      }
      this.formatCurrency('sale_amount');
    },
    // Форматирование суммы
    formatCurrency(num) {
      this.doc[num] = this.doc[num] + '';
      var number = this.doc[num].replace(/[^\d.-]/g, '');
      var splitArray = number.split('.');
      var integer = splitArray[0];
      var mantissa = splitArray.length > 1 ? '.' + splitArray[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(integer)) {
        integer = integer.replace(rgx, '$1' + ' ' + '$2');
      }
      this.doc[num] = integer + mantissa.substring(0, 3);
    },
    // Форматирование даты
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    // Парсинг даты
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
    accountsUSD() {
      return this.accounts.filter((item) =>{
           return item.currency == 'USD'
      })
    },
    accountsEUR() {
      return this.accounts.filter((item) =>{
           return item.currency == 'EUR'
      })
    }
  }
});