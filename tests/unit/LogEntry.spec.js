import { createLocalVue, shallowMount } from "@vue/test-utils";
import LogEntry from "@/components/LogEntry.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt);

const localVue = createLocalVue();
localVue.filter("moment", () => {
  return "Today!";
});
localVue.component("FontAwesomeIcon", FontAwesomeIcon);

const mutate = jest.fn();

describe("LogEntry.vue", () => {
  test("renders correctly", () => {
    const wrapper = shallowMount(LogEntry, {
      localVue,
      propsData: {
        entry: {
          id: "1234",
          content: "This is a test",
          created: "2018-11-10T21:39:43.115Z"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  test("should call apollo when deleting", () => {
    const wrapper = shallowMount(LogEntry, {
      localVue,
      propsData: {
        entry: {
          id: "1234",
          content: "This is a test",
          created: "2018-11-10T21:39:43.115Z"
        }
      },
      mocks: {
        $apollo: {
          mutate
        }
      }
    });
    wrapper.vm.deleteLogEntry("1234");
    expect(mutate).toBeCalled();
  });
});
