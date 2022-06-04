import { Joi } from '@docusaurus/utils-validation'
import type { ValidationSchema, OptionValidationContext, PluginOptions } from '@docusaurus/types'

const defaults = {
  enabled: true,
  verbose: false,
  gistPageComponent: '@theme/GistPage',
  gistListPageComponent: '@theme/GistListPage',
}

export const Schema = Joi.object({
  enabled: Joi.string()
    .equal(true, false)
    .default(defaults.enabled)
    .label('Whether the plugin is enabled or not.'),
  verbose: Joi.string()
    .equal(true, false)
    .default(defaults.verbose)
    .label('Verbose output during build phase'),
  personalAccessToken: Joi.string().required().label('GitHub Personal Access Token'),
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
  return validate(Schema, options)
}
