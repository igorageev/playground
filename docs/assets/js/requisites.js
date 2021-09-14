new Vue({
  el: "#app",
  data() {
    return {
      tab: null,
      tabs: ['сегодня', 'вчера', 'период'],
      items: [
        {
          avatar: 'mdi-plus',
          color: 'green lighten-3',
          subtitle: 'Получатель',
          title: 'ООО "БИФИТ-сервис"'
        },
        {
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          subtitle: 'ИНН',
          title: '45312345646'
        },
        {
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          subtitle: 'Номер счета',
          title: '40702 810 2 7105 4440370'
        },
        {
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          subtitle: 'Наименование банка',
          title: 'БАНК ВТБ (ПАО) г. САНКТ-ПЕТЕРБУРГ'
        },
        {
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          subtitle: 'БИК',
          title: '674153244353'
        },
        {
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          subtitle: 'К/С',
          title: '40702 810 3 0000 0001234'
        },
      ],
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