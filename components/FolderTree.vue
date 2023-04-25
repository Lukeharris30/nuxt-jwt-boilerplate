<template>
    <div>
      <q-splitter
        v-model="splitterModel"
        style="height: 400px"
      >
        <template v-slot:before>
          <div class="q-pa-md">
            <q-tree
              :nodes="simple"
              node-key="label"
              selected-color="primary"
              v-model:selected="selected"
              default-expand-all
            />
          </div>
        </template>
  
        <template v-slot:after>
          <q-tab-panels
            v-model="selected"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="file name">
              <div class="text-h4 q-mb-md">Welcome</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="Food">
              <div class="text-h4 q-mb-md">Food</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="Room service">
              <div class="text-h4 q-mb-md">Room service</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="Room view">
              <div class="text-h4 q-mb-md">Room view</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </template>

<script setup>
 const splitterModel = ref(50)
const selected = ref('Food')
const simple =  [
        {
          label: 'folder 1',
          icon: 'folder',
          children: [
            {
              label: 'file name',
              icon: 'description'
            },
            {
              label: 'Room service',
              icon: 'description'
            },
            {
              label: 'Room view',
              icon: 'description'
            }
          ]
        }
      ]
  </script>
  