<!-- App.vue -->
<template>
    <div>
        <q-input ref="filterRef" filled v-model="filter" label="Filter"></q-input>
        
        <q-tree
        :nodes="folders"
        v-model:selected="selected"
        selected-color="primary"
        node-key="name"
        label-key="name"
        :filter="filter"
        @lazy-load="onLazyLoad"
        />
    </div>
    <pre>{{ selected }}</pre>
  </template>
  
<script setup>
import { ref } from 'vue';

const selected = ref(null)
const filter = ref('')

const folders = ref([
{
    id: 1,
    name: 'Root',
    icon: 'folder',
    children: [
    {
        id: 2,
        name: 'Folder A',
        icon: 'folder',
       
        children: [
        {
            id: 3,
            name: 'Folder A1',
            icon: 'folder',
            lazy: true,
            children: []
        },
        {
            id: 4,
            name: 'Folder A2',
            icon: 'folder',
            children: [
            {
                id: 5,
                name: 'Folder A2-1',
                icon: 'folder',
                children: [
                {
                    id: 7,
                    name: 'Folder A2-2',
                    icon: 'folder',
                    children: []

                }
                ]
            }
            ]
        }
        ]
    },
    {
        id: 6,
        name: 'Folder B',
        icon: 'folder',
        children: []
    }
    ]
}
]);

const lazy = ref(folders)

const onLazyLoad = function({ node, key, done, fail }) {
        // call fail() if any error occurs
    console.log('lazy loading', {node}, {key}, {done})
        setTimeout(() => {
          // simulate loading and setting an empty node

          const label = node.name
          done([
            { name: `${label}.1` },
            { name: `${label}.2`, lazy: true },
            {
              name: `${label}.3`,
              children: [
                { name: `${label}.3.1`, lazy: true },
                { name: `${label}.3.2`, lazy: true }
              ]
            }
          ])
        }, 1000)
        // return
      }
  
 
</script>
  