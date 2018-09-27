import * as React from 'react';
import {shallowWithAppProvider, trigger} from '../../../../tests/utilities';
import {UnstyledLink, Icon, Spinner} from '../..';
import Button from '../Button';

describe('<Button />', () => {
  describe('children', () => {
    it('renders the given children', () => {
      const label = 'Click me!';
      const button = shallowWithAppProvider(<Button>{label}</Button>);
      expect(button.text()).toContain(label);
    });
  });

  describe('url', () => {
    const mockUrl = 'http://google.com';

    it('renders a link when present', () => {
      const button = shallowWithAppProvider(
        <Button disabled url={mockUrl}>
          Click me!
        </Button>,
      );
      expect(button.find(UnstyledLink).exists()).toBeTruthy();
    });

    it('gets passed into the link', () => {
      const button = shallowWithAppProvider(
        <Button disabled url={mockUrl}>
          Click me!
        </Button>,
      );
      expect(button.find(UnstyledLink).prop('url')).toBe(mockUrl);
    });

    it('renders a button when not present', () => {
      const button = shallowWithAppProvider(
        <Button disabled>Click me!</Button>,
      );
      expect(button.find('button').exists()).toBeTruthy();
    });
  });

  describe('id', () => {
    it('is passed into the button', () => {
      const id = 'MyID';
      const button = shallowWithAppProvider(<Button id={id}>Button</Button>);
      expect(button.find('button').prop('id')).toBe(id);
    });

    it('is passed into the link', () => {
      const id = 'MyID';
      const button = shallowWithAppProvider(
        <Button url="https://shopify.com" id={id}>
          Button
        </Button>,
      );
      expect(button.find(UnstyledLink).prop('id')).toBe(id);
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button disabled>Disabled test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBeTruthy();
    });

    it('sets the disabled attribute on the link', () => {
      const button = shallowWithAppProvider(
        <Button disabled url="http://google.com">
          Disabled test
        </Button>,
      );
      expect(button.find(UnstyledLink).prop('disabled')).toBeTruthy();
    });
  });

  describe('loading', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button loading>Loading test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('sets the disabled attribute on the link', () => {
      const button = shallowWithAppProvider(
        <Button loading url="http://google.com">
          Loading test
        </Button>,
      );
      expect(button.find(UnstyledLink).prop('disabled')).toBeTruthy();
    });

    it('renders a spinner into the button', () => {
      const button = shallowWithAppProvider(
        <Button loading>Loading test</Button>,
      );
      expect(button.find(Spinner).exists()).toBeTruthy();
    });

    it('renders a spinner into the link', () => {
      const button = shallowWithAppProvider(
        <Button loading url="http://google.com">
          Loading test
        </Button>,
      );
      expect(button.find(Spinner).exists()).toBeTruthy();
    });

    it('sets an alert role on the button', () => {
      const button = shallowWithAppProvider(
        <Button loading>Loading test</Button>,
      );
      expect(button.find('button').prop('role')).toBe('alert');
    });

    it('sets aria-busy on the button', () => {
      const button = shallowWithAppProvider(
        <Button loading>Loading test</Button>,
      );
      expect(button.find('button').prop('aria-busy')).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('sets a submit type on the button when present', () => {
      const button = shallowWithAppProvider(<Button submit>Click me!</Button>);
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets a button type on the button when not present', () => {
      const button = shallowWithAppProvider(<Button>Click me!</Button>);
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('external', () => {
    it('gets passed into the link', () => {
      const button = shallowWithAppProvider(
        <Button url="http://google.com" external>
          Click me!
        </Button>,
      );
      expect(button.find(UnstyledLink).prop('external')).toBeTruthy();
    });

    it('is false when not set', () => {
      const button = shallowWithAppProvider(
        <Button url="http://google.com">Click me!</Button>,
      );
      expect(button.find(UnstyledLink).prop('external')).toBeFalsy();
    });
  });

  describe('icon', () => {
    it('renders an icon if it’s a string', () => {
      const source = 'delete';
      const button = shallowWithAppProvider(<Button icon={source} />);
      expect(button.find(Icon).prop('source')).toBe(source);
    });

    it('renders an icon if it’s an SVGSource object', () => {
      const source = {body: '<SVG />', viewBox: ''};
      const button = shallowWithAppProvider(<Button icon={source} />);
      expect(button.find(Icon).prop('source')).toBe(source);
    });

    it('renders a react node if it is one', () => {
      const Icon = () => <div>Hi there!</div>;
      const button = shallowWithAppProvider(<Button icon={<Icon />} />);
      expect(button.find(Icon).exists()).toBeTruthy();
    });
  });

  describe('accessibilityLabel', () => {
    it('sets an aria-label on the button', () => {
      const label = 'This deletes a thing';
      const button = shallowWithAppProvider(
        <Button accessibilityLabel={label} />,
      );
      expect(button.find('button').prop('aria-label')).toBe(label);
    });

    it('sets an aria-label on the link', () => {
      const label = 'This deletes a thing';
      const button = shallowWithAppProvider(
        <Button accessibilityLabel={label} url="http://google.com" />,
      );
      expect(button.find(UnstyledLink).prop('aria-label')).toBe(label);
    });
  });

  describe('ariaControls', () => {
    it('sets an aria-controls on the button', () => {
      const id = 'panel1';
      const button = shallowWithAppProvider(<Button ariaControls={id} />);
      expect(button.find('button').prop('aria-controls')).toBe(id);
    });
  });

  describe('ariaExpanded', () => {
    it('sets an aria-expended on the button', () => {
      const button = shallowWithAppProvider(<Button ariaExpanded />);
      expect(button.find('button').prop('aria-expanded')).toBeTruthy();
    });
  });

  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const onClickSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onClick={onClickSpy}>Test</Button>,
      );
      trigger(button.find('button'), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is clicked', () => {
      const onClickSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onClick={onClickSpy} url="http://google.com">
          Test
        </Button>,
      );
      trigger(button.find(UnstyledLink), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onFocus={onFocusSpy}>Test</Button>,
      );
      trigger(button.find('button'), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is focussed', () => {
      const onFocusSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onFocus={onFocusSpy} url="http://google.com">
          Test
        </Button>,
      );
      trigger(button.find(UnstyledLink), 'onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onBlur={onBlurSpy}>Test</Button>,
      );
      trigger(button.find('button'), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('is called when the link is blurred', () => {
      const onBlurSpy = jest.fn();
      const button = shallowWithAppProvider(
        <Button onBlur={onBlurSpy} url="http://google.com">
          Test
        </Button>,
      );
      trigger(button.find(UnstyledLink), 'onBlur');
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });
});
