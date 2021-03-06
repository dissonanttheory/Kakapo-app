import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { newSoundClass } from 'classes/';
import { getData } from '../helper';
import { SoundItem } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  return { props, wrapper: shallow(<SoundItem {...propData} />) };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 1, ...props };
  return { sound: Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {}) };
};

const defaultClassName = 'item waves-effect waves-block';
const youtubeTestId = '7ccQyyCLtx8';

test('<SoundItem/> render', t => {
  t.plan(2);
  const { wrapper } = setup(soundProp());
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), `${defaultClassName} paused`);
});

test('<SoundItem/> w/o image', t => {
  t.plan(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
  t.equals(wrapper.find('.no-image').length, 1);
});

test('<SoundItem/> render 3 icons', t => {
  t.plan(3);
  const { wrapper } = setup(soundProp());
  t.equals(wrapper.find('.icon-share').length, 1);
  t.equals(wrapper.find('.icon-edit').length, 1);
  t.equals(wrapper.find('.icon-delete').length, 1);
});

test('<SoundItem/> youtube render', t => {
  t.plan(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  t.equals(wrapper.prop('className'), `${defaultClassName} paused youtube-stream`);
});

test('<SoundItem/> youtube render 2 icons', t => {
  t.plan(1);
  const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  t.equals(wrapper.find('.icon-edit').length, 0);
});

test('<SoundItem/> youtube render test-id', t => {
  t.plan(2);
  const { wrapper } = setup(soundProp({ file: youtubeTestId, source: 'youtubeStream' }));
  t.equals(wrapper.find('.youtube-video').length, 1);
  t.equals(wrapper.find('.youtube-video').prop('id'), `video-${youtubeTestId}`);
});

test('<SoundItem/> render playing', t => {
  t.plan(1);
  const { wrapper } = setup(soundProp({ playing: true }));
  t.equals(wrapper.prop('className'), `${defaultClassName} playing`);
});
