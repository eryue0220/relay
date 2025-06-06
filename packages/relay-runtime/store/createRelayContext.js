/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall relay
 */

'use strict';

import type {RelayContext} from './RelayStoreTypes.js';
import type {Context} from 'react';
import typeof {createContext} from 'react';

const invariant = require('invariant');

// Ideally, we'd just import the type of the react module, but this causes Flow
// problems.
type React = $ReadOnly<{
  createContext: createContext<RelayContext | null>,
  version: string,
  ...
}>;

let relayContext: ?Context<RelayContext | null>;
let firstReact: ?React;

function createRelayContext(react: React): Context<RelayContext | null> {
  if (!relayContext) {
    relayContext = react.createContext(null);
    if (__DEV__) {
      relayContext.displayName = 'RelayContext';
    }
    firstReact = react;
  }
  invariant(
    react === firstReact,
    '[createRelayContext]: You are passing a different instance of React',
    react.version,
  );
  return relayContext;
}

module.exports = createRelayContext;
