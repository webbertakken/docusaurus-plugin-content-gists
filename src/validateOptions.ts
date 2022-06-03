import { Joi } from "@docusaurus/utils-validation";
import type {
  ValidationSchema,
  OptionValidationContext,
  PluginOptions,
} from "@docusaurus/types";

export const Schema = Joi.object({
  enabled: Joi.string()
    .equal(true, false)
    .default(true)
    .label("Whether the plugin is enabled or not."),
  verbose: Joi.string()
    .equal(true, false)
    .default(false)
    .label("Verbose output during build phase"),
  personalAccessToken: Joi.string()
    .required()
    .label("GitHub Personal Access Token"),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<ValidationSchema<PluginOptions>, PluginOptions>) {
  return validate(Schema, options);
}
