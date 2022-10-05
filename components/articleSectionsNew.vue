<template lang="pug">
div
  AddEditCompany(
      v-if="showQuickAdds.companies"
      :showeditcompany="showQuickAdds.companies"
      @close="showQuickAdds.companies = false"
      type="add"
      @success="showQuickAdds.companies = false"
    )
  AddEditIssue(
      type="create"
      :showissuesmodal="showQuickAdds.issues"
      @close="showQuickAdds.issues = false"
      @success="showQuickAdds.issues = false"
    )
  AddEditGroup(
      type="create"
      :showgroupsmodal="showQuickAdds.groups"
      @close="showQuickAdds.groups = false"
      @success="showQuickAdds.groups = false"
    )
  AddEditCampaign(
      v-if="showQuickAdds.campaigns"
      type="create"
      :showcampaignmodal="showQuickAdds.campaigns"
      @close="showQuickAdds.campaigns = false"
      @success="showQuickAdds.campaigns = false"
    )
  AddEditProminentIndividuals(
      type="create"
      :showpimodal="showQuickAdds.prominentIndividuals"
      @close="showQuickAdds.prominentIndividuals = false"
      @success="showQuickAdds.prominentIndividuals = false"
    )
  v-expansion-panels(
    accordion
    multiple
  )
    v-expansion-panel(
        v-for="(section, index) in sections"
        :key="index"
        :value="getSectionsIndexesWithSelectionMade()"
      )
        v-expansion-panel-header {{section.title}} {{selections[section.query] && selections[section.query].length > 0 ? `(${selections[section.query].length} selected)` : ``}}
        v-expansion-panel-content
            v-autocomplete(
                outlined
                multiple
                :search-input="searchForFilter"
                :items="getItemsForEachSection(section.query)"
                dense
                hide-no-data
                cache-items
                @update:search-input="(value) => searchSectionItem(section.query, value)"
                @change="(value) => selectionMade(section.query, value)"
                :item-text="formatText"
                return-object
                item-value="node.id"
                :placeholder="`search ${section.title.toLowerCase()}`"
                :value="getSelected(section.query)"
            )
                    template(v-slot:selection="data")
                        span 
            v-btn(
                v-if="section.quickAdd"
                x-small
                depressed
                @click="quickAdd(section.quickAddDoc, section.query)"
                class="mt-n9"
                ) Quick Add
            div(
                class="mt-n2 items"
            )
                div(v-if="!selections[section.query] || selections[section.query].length < 1" class="text-center pt-3")
                    span No {{section.title}} selected yet
                div(v-else)
                v-chip(
                    v-for="(selection, index) in selections[section.query]"
                    :key="index"
                    class="ma-2"
                    color="green"
                    close
                    @click:close="removeSector(section.query, selection.node.id)"
                    small
                    text-color="white"
                ).ma-0
                  span(class="text-truncate") {{formatText(selection) }}
</template>

<script lang="ts">
import { paginator } from "@/utils/paginator";
import AddEditCompany from "@/components/addEditCompany.vue";
import AddEditIssue from "@/components/addEditIssue.vue";
import AddEditGroup from "@/components/addEditGroup.vue";
import AddEditCampaign from "@/components/addEditCampaign.vue";
import AddEditProminentIndividuals from "@/components/addEditProminentIndividuals.vue";
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
    sectionsdata: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    AddEditCompany,
    AddEditIssue,
    AddEditGroup,
    AddEditCampaign,
    AddEditProminentIndividuals,
  },
  data: () => ({
    values: {},
    showQuickAdds: {
      companies: false,
      issues: false,
      groups: false,
      campaigns: false,
      prominentIndividuals: false,
    },
    searchValues: {},
    selections: {},
    formatedItems: {},
    searchForFilter: null,
    searchFilter: {
      paging: paginator(50),
      filter: { and: [] },
    },
  }),
  computed: {},
  apollo: {},
  methods: {
    getSelected(query) {
      // console.log(query, this.selections[query]);

      if (Array.isArray(this.selections[query])) {
        const itemIds = this.selections[query].map((section) => {
          return section;
        });
        // console.log("itemIdsitemIds", itemIds);
        // this.values[query] = this.selections[query];
        return itemIds;
      }
      return [];
    },
    getSectionsIndexesWithSelectionMade() {
      const finalIndexs = [];
      if (Object.keys(this.selections)?.length > 0) {
        this.sections
          .map((sec) => sec.query)
          .forEach((section) => {
            const selected = this.selections[section] || [];
            // console.log("this.selectionsthis.selections", selected);
            if (selected.length > 0) {
              const index = this.sections
                .map((sec) => sec.query)
                .indexOf(section);
              if (index >= 0) {
                finalIndexs.push(index);
              }
            }
          });
      }
      return finalIndexs;
    },
    quickAdd(doc, query) {
      this.showQuickAdds[query] = true;
      // const inputToAdd = this.$refs[inputRef];
      // console.log(this.searchValues[query]);
    },
    getItemsForEachSection(query) {
      return this.formatedItems[query];
    },
    formatText(item) {
      return item.node?.name || item.node?.title;
    },
    selectionMade(query, values) {
      // console.log(query, values);
      this.selections = Object.assign({}, this.selections, {
        [query]: values,
      });
    },
    searchSectionItem(query, values) {
      // console.log("query, values", query, values);
      // this.searchValues = Object.assign({}, this.searchValues, {
      //   [query]: values,
      // });
      setTimeout(() => {
        if (values.length > 0) {
          const keyword = ["articles", "actions"].includes(query)
            ? "title"
            : "name";
          const searchFormatted = `%${values}%`;
          this.searchFilter.filter.and = [
            {
              ...this.searchFilter.filter.and[0],
              or: [
                {
                  [keyword]: {
                    iLike: searchFormatted,
                  },
                },
              ],
            },
          ];
        }
        if (!values) {
          this.searchFilter.filter.and = [
            {
              ...this.searchFilter.filter.and[0],
              or: [],
            },
          ];
        }
        this.$apollo.queries[query].refetch(this.searchFilter);
      }, 1000);
    },
    removeSector(query, id: string) {
      const indexInselections = this.selections[query]
        .map((item) => item.node.id)
        .indexOf(id);
      // console.log("hahahahhhaha", query, id, indexInselections);
      this.selections[query].splice(indexInselections, 1);
    },
  },
  mounted() {
    this.sections.forEach((section) => {
      this.$apollo.addSmartQuery(section.query, {
        ...section.doc({
          variables: {
            paging: paginator(50),
          },
        }),
        result(data: any) {
          // console.log(data);
          // let dataFormatted = [];
          if (data) {
            if (data?.data) {
              if (data?.data[section.query]) {
                if (data?.data[section.query]?.edges) {
                  this.formatedItems = Object.assign({}, this.formatedItems, {
                    [section.query]: data?.data[section.query]?.edges,
                  });
                }
              }
            }
          }
          if (Object.entries(this.sectionsdata)?.length > 0) {
            this.selections = this.sectionsdata;
          }
        },
      });
    });
  },
  watch: {
    selections: {
      handler(v) {
        this.$emit("selectionchanged", v);
      },
      deep: true,
    },
    // searchFilter: {
    //   handler(variables) {
    //     this.$apollo.queries[this.query].refetch(variables);
    //   },
    //   deep: true,
    // },
    // searchForFilter(v) {
    //   setTimeout(() => {
    //     if (v.length > 0) {
    //       const keyword = ["articles", "actions"].includes(this.query)
    //         ? "title"
    //         : "name";
    //       const searchFormatted = `%${v}%`;
    //       this.searchFilter.filter.and = [
    //         {
    //           ...this.searchFilter.filter.and[0],
    //           or: [
    //             {
    //               [keyword]: {
    //                 iLike: searchFormatted,
    //               },
    //             },
    //           ],
    //         },
    //       ];
    //     }
    //     if (!v) {
    //       this.searchFilter.filter.and = [
    //         {
    //           ...this.searchFilter.filter.and[0],
    //           or: [],
    //         },
    //       ];
    //     }
    //   }, 1000);
    //   // },
    // },
  },
};
</script>

<style scoped>
.items {
  height: 10vh;
  width: 100%;
  overflow-x: scroll;
}
</style>
