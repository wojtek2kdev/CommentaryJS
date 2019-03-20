//base
import Channel from './base';
import Preset from './preset';
import ChannelComponent from './components/Channel.vue';

const components = {
  ChannelComponent,
};

//communication
import {
  newComment,
} from './receivers';

//components
import channel from './components/Channel.vue';

const Component = {
  channel,
};

const Receiver = {
  newComment,
}

export {
  Channel,
  Preset,
  Component,
  Receiver,
};
