<template>
  <div>
    <v-row justify-sm="space-between">
      <v-col cols="12" sm="5" class="mt-9">
        <v-btn
          color="primary"
          tile
          depressed
          large
          @click="addRoleDialog = true"
          ><span class="body-3">+</span
          ><span class="ml-3">Add Roles</span></v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="searchBar"
          placeholder="Search Roles"
          rounded
          type="text"
          aria-autocomplete="false"
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          @keyup="searchData()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-n4">
      <v-col cols="12">
        <v-sheet
          color="white"
          class="pt-9 px-2 pb-4"
          elevation="1"
          rounded
          max-height="auto"
          min-height="60vh"
          min-width="100%"
          max-width="auto"
        >
          <TablesRolesTable
            :header="header"
            :rolesdata="roles"
            :permissions="permissions"
            :loading="loadingRoleData"
            :itemsperpage="itemsPerPage"
            :serveritemslength="totalRoles"
            @complete="fetchRoleData()"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  layout: "admin",
  data() {
    return {
      updateCreateComponent: 1,
      searchBar: null,
      totalRoles: 0,
      itemsPerPage: 10,
      loadingRoleData: false,
      roles: [],
      permissions: [],
      // table
      header: [
        {
          text: "Role Name",
          // align: 'center',
          sortable: false,
          value: "name",
        },
        {
          text: "Description",
          // align: 'center',
          sortable: false,
          value: "description",
        },
        {
          text: "Permissions",
          // align: 'center',
          sortable: false,
          value: "grantedPermissions",
        },
        {
          text: "Action",
          // align: 'center',
          sortable: false,
        },
      ],
    };
  },
  async fetch() {
    this.loadingRoleData = true;
    await this.fetchRoleData();
    const roleData = await this.$api.getAllRoles(this.searchBar);
    this.roles = roleData.result.items;
    this.totalRoles = roleData.result.totalCount;
    this.loadingRoleData = false;
  },
  methods: {
    async fetchRoleData() {
      const permissionData = await this.$api.getAllpermissions(this.searchBar);
      this.permissions = permissionData.result.items;
    },
  },
  head() {
    return {
      title: "Roles",
    };
  },
  methods: {
    searchData: debounce(function () {
      this.fetchRoleData();
    }, 500),
  },
};
</script>
