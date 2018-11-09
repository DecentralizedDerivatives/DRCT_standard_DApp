// COMPLETE
import ConnectionModal from '../../components/ConnectionModal';
import { showConnectionModal } from '../../actions/statusActions';

jest.mock('../../actions/statusActions');
showConnectionModal.mockImplementation(() => () => undefined);

function setup(overrides) {
  const store = initStore();

  const props = { store, ...overrides };

  const wrapper = shallow(<ConnectionModal {...props} />).dive();

  return {
    wrapper,
  };
}

describe('<ConnectionModal />', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('handles footer click', () => {
    const { wrapper } = setup();

    wrapper.find('ModalFooter > button').simulate('click');

    expect(showConnectionModal).toBeCalledTimes(1);
  });
});
