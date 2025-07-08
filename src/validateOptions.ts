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
  personalAccessToken: Joi.string()
    .required()
    .min(1)
    .pattern(/^(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/)
    .label('GitHub Personal Access Token')
    .messages({
      'string.pattern.base': 'Personal Access Token must be a valid GitHub token format (ghp_* or github_pat_*)'
    }),
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
