new Vue({
  el: "#app",
  data() {
    return {
      drawer: null,
      goDark: false
    }
  },
  components: {
    'ib-navigation': httpVueLoader('assets/components/ib-navigation.vue')
  },
  mounted() {
    document.getElementById('app').style.visibility = "visible";
  },
  watch: {

  },
  methods: {
    
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
    }
  }
});