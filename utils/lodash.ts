import pick from 'lodash/pick'
import isNumber from 'lodash/isNumber'
import isArray from 'lodash/isArray'
import omit from 'lodash/omit'
import forEach from 'lodash/forEach'
import mergeWith from 'lodash/mergeWith'
import get from 'lodash/get'
import set from 'lodash/set'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import uniqWith from 'lodash/uniqWith'
import merge from 'lodash/merge'
import omitBy from 'lodash/omitBy'
import defaultsDeep from 'lodash/defaultsDeep'
import has from 'lodash/has'
import isString from 'lodash/isString'
import pickBy from 'lodash/pickBy'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import flatMapDeep from 'lodash/flatMapDeep'
import flatMap from 'lodash/flatMap'
import last from 'lodash/last'
import findLast from 'lodash/findLast'
import findLastIndex from 'lodash/findLastIndex'
import groupBy from 'lodash/groupBy'
import throttle from 'lodash/throttle'
import setWith from 'lodash/setWith'
import unset from 'lodash/unset'
import assign from 'lodash/assign'

function getRandomIndexInArray(arr = []) {
  const length = arr.length
  const index = Math.floor(Math.random() * length)
  return arr[index]
}

export {
  isNumber,
  isArray,
  omit,
  forEach,
  mergeWith,
  get,
  set,
  defaultsDeep,
  debounce,
  pick,
  cloneDeep,
  isEqual,
  uniq,
  uniqBy,
  uniqWith,
  merge,
  omitBy,
  unset,
  has,
  isString,
  pickBy,
  isNil,
  isEmpty,
  flatMapDeep,
  flatMap,
  assign,
  last,
  findLast,
  findLastIndex,
  groupBy,
  throttle,
  setWith,
  getRandomIndexInArray,
}
