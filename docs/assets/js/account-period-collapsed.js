new Vue({
  el: "#app",
  data() {
    return {
      tab: 2,
      panel: [0,1],
      tabs: [
        {id:0, title:'сегодня'}, 
        {id:1, title:'вчера'}, 
        {id:2, title:'период'}
      ],
      activeTab: 2,
      items: [
        {
          id: 0,
          avatar: 'mdi-plus',
          color: 'green lighten-3',
          title: '<span class="green--text">+</span>&nbsp;762<span class="grey--text">.00</span> ',
          object: 'НКО "Фонд капитального ремонта дорог заполярного края"',
          subtitle: 'НКО "Фонд капитального ремонта дорог заполярного края"',
          action: 'Поступление на счет'
        },
        {
          id: 1,
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          title: '<span class="red--text">–</span>&nbsp;10 000<span class="grey--text">.00</span> ',
          object: 'ООО "Эс как доллар"',
          subtitle: `ООО "Эс как доллар"`,
          action: 'Перевод со счета'
        },
        {
          id: 2,
          avatar: 'mdi-undo-variant',
          color: 'blue lighten-3',
          title: '<span class="red--text">–</span>&nbsp;3 000<span class="grey--text">.00</span> ',
          object: 'ООО "ПроКоммерцБанк"',
          subtitle: 'Снятие наличных',
          action: 'ООО "ПроКоммерцБанк"',
        },
        {
          id: 3,
          avatar: 'mdi-plus',
          color: 'green lighten-3',
          title: '<span class="green--text">+</span>&nbsp;762<span class="grey--text">.77</span> ',
          object: 'ЗАО "Чем тебе горы вот такой вышины"',
          subtitle: `ЗАО "Чем тебе горы вот такой вышины"`,
          action: 'Поступление на счет'
        },
        {
          id: 4,
          avatar: 'mdi-minus',
          color: 'red lighten-3',
          title: '<span class="red--text">–</span>&nbsp;10 000<span class="grey--text">.00</span> ',
          object: 'Управление Федерального казначейства по г. Москве',
          subtitle: `Управление Федерального казначейства по г. Москве`,
          action: 'Перевод со счета'
        },
        {
          id: 5,
          avatar: 'mdi-undo-variant',
          color: 'blue lighten-3',
          title: '<span class="red--text">–</span>&nbsp;11 000<span class="grey--text">.00</span> ',
          object: 'ООО "ПроКоммерцБанк"',
          subtitle: 'Покупка валюты',
          action: 'ООО "ПроКоммерцБанк"'
        }
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