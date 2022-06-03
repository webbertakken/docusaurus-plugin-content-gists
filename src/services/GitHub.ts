import { Octokit } from "octokit";
import { Authenticated, Gist, Gists } from "../types";

type Props = {
  personalAccessToken: string;
};

export default class GitHub {
  private instance: InstanceType<typeof Octokit>;

  constructor(props: Props) {
    const { personalAccessToken: auth } = props;
    this.instance = new Octokit({ auth });
  }

  public async getAuthenticated(): Promise<Authenticated> {
    const response = await this.instance.rest.users.getAuthenticated();

    return response.data;
  }

  public async getUsername() {
    const authenticated = await this.getAuthenticated();

    return authenticated?.login || null;
  }

  public async getMyGists(): Promise<Gists> {
    const response = await this.instance.rest.gists.list();

    return response.data.filter((gist) => gist.public === true);
  }

  public async getGist(id: string): Promise<Gist> {
    const response = await this.instance.rest.gists.get({ gist_id: id });

    return response.data;
  }
}
