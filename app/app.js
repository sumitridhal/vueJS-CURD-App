/*************************************************/
//localStorage persistence
var STORAGE_KEY = "items";
//localStorage.clear();
var itemStorage = {
  fetch: function() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var items = saved !== null
      ? JSON.parse(saved)
      : [
          {
            username: "Jondi Rose",
            fullname: "Alfred Jond Rose",
            point: 1234,
            notes: "super user"
          },
          {
            username: "Dulal",
            fullname: "Jonathan Smith",
            point: 23,
            notes: "new user"
          }
        ];
    items.forEach(function(item, index) {
      item.id = index;
    });
    itemStorage.uid = items.length;
    return items;
  },
  save: function(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

/*********************************************/
Vue.filter("limit", function(value, amount) {
  return value.filter(function(val, index, arr) {
    return index < amount;
  });
});

// app Vue instance
var app = new Vue({
  // app initial state
  data: {
    title: "VueJS 2.1x CURD Application",
    addNew: false,
    newItem: {},
    mode: "",
    search: "",
    options: {
      availableOptions: [
        {
          id: "1",
          name: "5",
          value: 5
        },
        {
          id: "2",
          name: "10",
          value: 10
        },
        {
          id: "3",
          name: "15",
          value: 15
        },
        {
          id: "4",
          name: "All",
          value: 100
        }
      ],
      limit: {
        id: "1",
        name: "5",
        value: 5
      } //This sets the default value of the select in the ui
    },
    items: itemStorage.fetch()
  },

  // watch items change for localStorage persistence
  watch: {
    items: {
      handler: function(items) {
        itemStorage.save(items);
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredItems: function() {
      var el = this.search;
      var limit = this.options.limit.value;
      var filter = this.items.filter(function(item) {
        return item.username.indexOf(el) != -1;
      });
      return filter.slice(0, limit);
    }
  },

  filters: {
    limit: function(value, amount) {
      return value.filter(function(val, index, arr) {
        return index < amount;
      });
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    Toggle: function() {
      this.addNew = !this.addNew;
    },
    addItem: function(item) {
      if (!item) {
        return;
      }
      this.items.push(item);

      this.newItem = {};
      this.addNew = !this.addNew;
    },

    updateItem: function(item, index) {
      this.items.splice(index, 1, item);
    },
    deleteItem: function(index) {
      this.items.splice(index, 1);
    },

    cancel: function() {
      this.newItem = {};
      this.addNew = !this.addNew;
    }
  },
  components: {tdRow: tdRow}
}).$mount("#dtapp");

app.$on("update", app.updateItem);
app.$on("deleteItem", app.deleteItem);
