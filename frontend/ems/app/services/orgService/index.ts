import { apolloClient } from 'app/graphql';
import {
  AddOrganizationInput,
  UpdateOrganizationInput
} from '__generated__/globalTypes';
import {
  ADD_TEAM_MEMBER,
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  REMOVE_TEAM_MEMBER,
  UPDATE_ORGANIZATION
} from './mutations';
import {
  GET_ORGANIZATION,
  GET_ORGANIZATION_BY_ID,
  GET_ORG_TEAM_MEMBERS
} from './queries';
import {
  AddTeamMember,
  AddTeamMemberVariables
} from './__generated__/AddTeamMember';
import {
  CreateOrganization,
  CreateOrganizationVariables
} from './__generated__/CreateOrganization';
import { DeleteOrganization } from './__generated__/DeleteOrganization';
import { GetOrganization } from './__generated__/GetOrganization';
import {
  GetOrganizationById,
  GetOrganizationByIdVariables
} from './__generated__/GetOrganizationById';
import { OrganizationTeamMembers } from './__generated__/OrganizationTeamMembers';
import {
  RemoveTeamMember,
  RemoveTeamMemberVariables
} from './__generated__/RemoveTeamMember';
import {
  UpdateOrganization,
  UpdateOrganizationVariables
} from './__generated__/UpdateOrganization';

class OrganizationService {
  async createOrganization(data: AddOrganizationInput) {
    try {
      const res = await apolloClient.mutate<
        CreateOrganization,
        CreateOrganizationVariables
      >({
        mutation: CREATE_ORGANIZATION,
        variables: { data }
      });

      if (!res || !res.data || !res.data.createOrganization) {
        throw new Error('Failed to create an organization');
      }
      return res.data.createOrganization;
    } catch (err: any) {
      throw err;
    }
  }

  async updateOrganization(data: UpdateOrganizationInput) {
    try {
      const res = await apolloClient.mutate<
        UpdateOrganization,
        UpdateOrganizationVariables
      >({
        mutation: UPDATE_ORGANIZATION,
        variables: { data }
      });

      if (!res || !res.data || !res.data.updateOrganization) {
        throw new Error('Failed to update an organization');
      }
      return res.data.updateOrganization;
    } catch (err: any) {
      throw err;
    }
  }

  async getOrganization() {
    try {
      const res = await apolloClient.query<GetOrganization>({
        query: GET_ORGANIZATION
      });

      if (!res || !res.data || !res.data.organization) {
        throw new Error('No organization');
      }
      return res.data.organization;
    } catch (err: any) {
      console.log(JSON.stringify(err));
      throw err;
    }
  }

  async getOrganizationById(orgId: string) {
    try {
      const res = await apolloClient.query<
        GetOrganizationById,
        GetOrganizationByIdVariables
      >({
        query: GET_ORGANIZATION_BY_ID,
        variables: { orgId }
      });

      if (!res || !res.data || !res.data.getOrganizationById) {
        throw new Error('No organization');
      }
      return res.data.getOrganizationById;
    } catch (err: any) {
      throw err;
    }
  }

  async deleteOrganization() {
    try {
      const res = await apolloClient.mutate<DeleteOrganization>({
        mutation: DELETE_ORGANIZATION
      });

      if (!res || !res.data) {
        throw new Error('Failed to delete an organization');
      }
      return res.data.deleteOrganization;
    } catch (err: any) {
      throw err;
    }
  }

  async getOrgTeamMembers() {
    try {
      const res = await apolloClient.query<OrganizationTeamMembers>({
        query: GET_ORG_TEAM_MEMBERS
      });

      if (!res || !res.data) {
        throw new Error('Team members not found');
      }
      return res.data.organization;
    } catch (err: any) {
      throw err;
    }
  }

  async addTeamMember(email: string) {
    try {
      const res = await apolloClient.mutate<
        AddTeamMember,
        AddTeamMemberVariables
      >({
        mutation: ADD_TEAM_MEMBER,
        variables: { email }
      });

      if (!res || !res.data) {
        throw new Error('Failed to add Team member');
      }
      return res.data.addTeamMember;
    } catch (err: any) {
      throw err;
    }
  }

  async removeTeamMember(email: string) {
    try {
      const res = await apolloClient.mutate<
        RemoveTeamMember,
        RemoveTeamMemberVariables
      >({
        mutation: REMOVE_TEAM_MEMBER,
        variables: { email }
      });

      if (!res || !res.data) {
        throw new Error('Failed to remove Team member');
      }
      return res.data.removeTeamMember;
    } catch (err: any) {
      throw err;
    }
  }
}

export default new OrganizationService();
