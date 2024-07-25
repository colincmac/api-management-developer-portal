// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type Values = {
  schemaID: string,
  showOperations: boolean,
  showErrors: boolean
}

export const valuesDefault: Readonly<Values> = Object.freeze({
    schemaID: 'custom-spec',
    showOperations: true,
    showErrors: true
})
