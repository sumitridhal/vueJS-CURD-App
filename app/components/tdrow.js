var tdRow = Vue.component("td-row", {
  name: 'td-row',
  template: '<tr><td class="sorting_1"><input type="text" class="form-control small" v-if="mode === \'edit\'" v-model="edit.username"><span v-else id="item.username">{{item.username}}</span></td><td><input type="text" class="form-control small" v-if="mode === \'edit\'" id="edit" v-model="edit.fullname"><span v-else id="item.fullname">{{item.fullname}}</span></td><td><input type="text" class="form-control small" v-if="mode === \'edit\'" id="edit" v-model="edit.point"><span v-else id="item.point">{{item.point}}</span></td><td><input type="text" class="form-control small" v-if="mode === \'edit\'" id="edit" v-model="edit.notes"><span v-else id="item.notes">{{item.notes}}</span></td><td><button class="btn btn-success btn-xs edit" v-if="mode === \'edit\'" @click="updateItem(edit, index)"><i class="fa fa-floppy-o"></i></button><button class="btn btn-success btn-xs" v-else @click="editItem(item)"><i class="fa fa-pencil-square-o "></i></button><button class="btn btn-danger btn-xs edit" v-if="mode === \'edit\'" @click="cancelUpdateItem(index)"><i class="fa fa-times"></i></button><button class="btn btn-danger btn-xs" v-else  @click="deleteItem(index)"><i class="fa fa-trash-o"></i></button></td><tr>',
  props: ["item", "index"],
  methods: {
    editItem: function(item) {
      this.edit = Vue.util.extend({}, item);
      this.mode = "edit";
    },

    cancelUpdateItem: function(index) {
      this.mode = "default";
    },

    updateItem: function(data, index) {
      this.$parent.$emit("update", data, index);
      this.mode = "default";
    },

    deleteItem: function(index) {
      this.$parent.$emit("deleteItem", index);
    }
  },
  data() {
    return {
      mode: "default",
      edit: {}
    };
  }
})
