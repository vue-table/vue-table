import './favicon.ico';
import './flaticon.scss';
import Vue from 'vue';
import Table from './components/Table.vue';
new Vue({
  el: '#app',
  render: h => h (Table),
});