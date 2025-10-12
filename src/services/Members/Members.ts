/**
 * @fileoverview Member service module for the Reading Club application
 * @description This module provides comprehensive member management functionality including
 * CRUD operations, pagination support, and member statistics. It serves as the primary
 * interface for all member-related API operations.
 *
 * @author Reading Club Development Team
 * @since 1.0.0
 */
import { ApiError, handleResponse } from "../Utility/ApiUtility";
import { deleteRequest, get, post } from "../../api/methods";
import endPoints from "../../api/endPoints";
import { Member, MemberFormData } from "../../types/member";
import { PaginatedResponse, PaginationParams } from "../../types/api";

/**
 * Member service object containing all member-related API operations
 * @namespace memberService
 * @description Provides a centralized interface for managing Reading Club members.
 * Supports full CRUD operations, pagination, and member statistics.
 */
export const memberService = {
  /**
   * Retrieves all members from the database with optional pagination support
   *
   * @description Fetches members from the API with support for both paginated and non-paginated responses.
   * When pagination is provided, returns structured pagination data including total count and hasMore flag.
   *
   * @param {PaginationParams} [pagination] - Optional pagination parameters
   * @param {number} pagination.page - The page number to retrieve (1-based)
   * @param {number} pagination.limit - The number of members per page
   *
   * @returns {Promise<PaginatedResponse<Member> | Member[]>}
   * - When pagination is provided: Returns PaginatedResponse with data, total, page, limit, and hasMore
   * - When no pagination: Returns array of all members
   *
   * @throws {ApiError} Throws ApiError if the request fails or response is invalid
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getAllMembers(
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Member> | Member[]> {
    let url = endPoints.memberEndpoint;
    if (pagination) {
      url += endPoints.fetchMemberDetailsEndpoint({
        page: pagination.page,
        limit: pagination.limit,
      });

      const response = await fetch(url);
      const data = await handleResponse<Member[]>(response);

      // Get total count from headers
      const totalCount = parseInt(
        response.headers.get("X-Total-Count") || "0",
        10
      );

      return {
        data,
        total: totalCount,
        page: pagination.page,
        limit: pagination.limit,
        hasMore: pagination.page * pagination.limit < totalCount,
      };
    } else {
      const response = await fetch(url);
      return handleResponse<Member[]>(response);
    }
  },

  /**
   * Retrieves a specific member by their unique identifier
   *
   * @description Fetches detailed information for a single member using their ID.
   * Useful for displaying member profiles, editing forms, or detailed views.
   *
   * @param {string} id - The unique identifier of the member to retrieve
   *
   * @returns {Promise<Member>} A promise that resolves to the member object
   *
   * @throws {ApiError} Throws ApiError if member is not found (404) or request fails
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getMemberById(id: string): Promise<Member> {
    const response = await get(endPoints.memberDetailsEndpoint(id));
    return handleResponse<Member>(response);
  },

  /**
   * Creates a new member in the Reading Club
   *
   * @description Adds a new member to the database with the provided information.
   * Automatically generates additional fields like dateOfJoining, avatar URL, and member ID.
   *
   * @param {MemberFormData} memberData - The member information to create
   * @param {string} memberData.email - The member's email address (must be unique)
   * @param {number[]} memberData.books - Array of book IDs that the member has read
   *
   * @returns {Promise<Member>} A promise that resolves to the created member with generated fields
   *
   * @throws {ApiError} Throws ApiError if creation fails (e.g., duplicate email, validation errors)
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async createMember(memberData: MemberFormData): Promise<Member> {
    // Generate avatar URL based on available members count
    const allMembers = (await this.getAllMembers()) as Member[];
    const avatarId = (allMembers.length % 70) + 1; // More variety in avatars

    const newMember: Member = {
      ...memberData,
      dateOfJoining: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/400?img=${avatarId}`,
    };

    const response = await post(
      endPoints.memberEndpoint,
      JSON.stringify(newMember)
    );

    return handleResponse<Member>(response);
  },

  /**
   * Updates an existing member's information
   *
   * @description Modifies an existing member's data while preserving fields not included
   * in the update. Useful for editing member profiles or updating reading lists.
   *
   * @param {string} id - The unique identifier of the member to update
   * @param {MemberFormData} memberData - The updated member information
   * @param {string} memberData.email - The member's updated email address
   * @param {number[]} memberData.books - Updated array of book IDs
   *
   * @returns {Promise<Member>} A promise that resolves to the updated member object
   *
   * @throws {ApiError} Throws ApiError if member not found (404) or update fails
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async updateMember(id: string, memberData: MemberFormData): Promise<Member> {
    // Get existing member to preserve other fields
    const existingMember = await this.getMemberById(id);

    const updatedMember: Member = {
      ...existingMember,
      ...memberData,
    };

    const response = await post(
      endPoints.updateMemberDetailsEndpoint(id),
      JSON.stringify(updatedMember)
    );

    return handleResponse<Member>(response);
  },

  /**
   * Removes a member from the Reading Club
   *
   * @description Permanently deletes a member from the database. This action cannot be undone.
   * Use with caution and ensure proper user confirmation before calling.
   *
   * @param {string} id - The unique identifier of the member to delete
   *
   * @returns {Promise<void>} A promise that resolves when the member is successfully deleted
   *
   * @throws {ApiError} Throws ApiError if member not found (404) or deletion fails
   * @throws {Error} May throw other errors for network issues
   */
  async deleteMember(id: string): Promise<void> {
    const response = await deleteRequest(endPoints.deleteMemberEndpoint(id));

    if (!response.ok) {
      throw new ApiError(
        `Failed to delete member: ${response.status} ${response.statusText}`,
        response.status
      );
    }
  },

  /**
   * Retrieves the total count of members in the Reading Club
   *
   * @description Fetches all members and returns the total count. Useful for displaying
   * statistics, pagination calculations, or dashboard information.
   *
   * @returns {Promise<number>} A promise that resolves to the total number of members
   *
   * @throws {ApiError} Throws ApiError if the request fails
   * @throws {Error} May throw other errors for network issues or parsing failures
   */
  async getMemberCount(): Promise<number> {
    const response = await get(endPoints.memberEndpoint);
    const members = await handleResponse<Member[]>(response);
    return members.length;
  },
};
