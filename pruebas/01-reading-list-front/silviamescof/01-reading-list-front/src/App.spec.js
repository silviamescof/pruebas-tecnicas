// App.spec.js
import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('se renderiza correctamente', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).toBe(true);
  });

  // Puedes agregar más tests según tus necesidades
});
