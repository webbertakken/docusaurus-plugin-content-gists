import { Joi } from '@docusaurus/utils-validation'
import type { ValidationSchema, OptionValidationContext, PluginOptions } from '@docusaurus/types'

const defaults = {
  enabled: true,
  verbose: false,
  gistPageComponent: '@theme/GistPage',
  gistListPageComponent: '@theme/GistListPage',
}

export const Schema = Joi.object({
  enabled: Joi.boolean().default(defaults.enabled).label('Whether the plugin is enabled or not.'),
  verbose: Joi.boolean().default(defaults.verbose).label('Verbose output during build phase'),
  gistPageComponent: Joi.string()
    .default(defaults.gistPageComponent)
    .label('The component for the page that shows the gist'),
  gistListPageComponent: Joi.string()
    .default(defaults.gistListPageComponent)
    .label('The component for the page that lists all gists'),
})

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<ValidationSchema<PluginOptions>, PluginOptions>) {
  // If there's a legacy configuration that still has `personalAccessToken` configured,
  // we should throw a descriptive error with instructions to use `GH_PERSONAL_ACCESS_TOKEN` and remove the legacy option.
  if ('personalAccessToken' in options && options.personalAccessToken) {
    const message =
      '\n---\n\n' +
      'Because of a critical security issue, `personalAccessToken` is no longer passed through the plugin options.\n' +
      "Please set the `GH_PERSONAL_ACCESS_TOKEN` environment variable instead (if you haven't already)." +
      '\n\n---'

    console.warn(message)

    throw new Error(message)
  }

  // If no token in environment, throw a clear error
  if (!process.env.GH_PERSONAL_ACCESS_TOKEN) {
    throw new Error('Please set GH_PERSONAL_ACCESS_TOKEN environment variable.')
  }

  return validate(Schema, options)
}
