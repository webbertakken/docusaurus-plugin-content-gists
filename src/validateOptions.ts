import { Joi } from '@docusaurus/utils-validation'
import type { ValidationSchema, OptionValidationContext, PluginOptions } from '@docusaurus/types'

const defaults = {
  enabled: true,
  verbose: false,
  gistPageComponent: '@theme/GistPage',
  gistListPageComponent: '@theme/GistListPage',
}

export const Schema = Joi.object({
  enabled: Joi.boolean()
    .default(defaults.enabled)
    .label('Whether the plugin is enabled or not.'),
  verbose: Joi.boolean()
    .default(defaults.verbose)
    .label('Verbose output during build phase'),
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
  // Check if token is provided in environment variable
  const hasTokenInEnv = process.env.GH_PERSONAL_ACCESS_TOKEN
  
  if (!hasTokenInEnv) {
    // If no token in environment, throw a clear error
    throw new Error('GitHub Personal Access Token is required but not provided. Please set GH_PERSONAL_ACCESS_TOKEN environment variable.')
  }
  
  return validate(Schema, options)
}
