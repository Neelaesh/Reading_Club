import { Book } from '../types/book';
import { ApiError, handleResponse } from './Utility/ApiUtility';
import { Member, MemberFormData } from '../types/member';
import { PaginatedResponse, PaginationParams } from '../types/api';

const API_BASE_URL = 'http://localhost:5000';

// Member API operations
export const memberService = {
  // Get all members with optional pagination
  async getAllMembers(pagination?: PaginationParams): Promise<PaginatedResponse<Member> | Member[]> {
    let url = `${API_BASE_URL}/members?_sort=dateOfJoining&_order=asc`;
    
    if (pagination) {
      url += `&_page=${pagination.page}&_limit=${pagination.limit}`;
      
      const response = await fetch(url);
      const data = await handleResponse<Member[]>(response);
      
      // Get total count from headers
      const totalCount = parseInt(response.headers.get('X-Total-Count') || '0', 10);
      
      return {
        data,
        total: totalCount,
        page: pagination.page,
        limit: pagination.limit,
        hasMore: (pagination.page * pagination.limit) < totalCount,
      };
    } else {
      const response = await fetch(url);
      return handleResponse<Member[]>(response);
    }
  },

  // Get member by ID
  async getMemberById(id: string): Promise<Member> {
    const response = await fetch(`${API_BASE_URL}/members/${id}`);
    return handleResponse<Member>(response);
  },

  // Create new member
  async createMember(memberData: MemberFormData): Promise<Member> {
    // Generate avatar URL based on available members count
    const allMembers = await this.getAllMembers() as Member[];
    const avatarId = (allMembers.length % 70) + 1; // More variety in avatars
    
    const newMember: Omit<Member, 'userId'> = {
      ...memberData,
      dateOfJoining: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/400?img=${avatarId}`
    };

    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    });

    return handleResponse<Member>(response);
  },

  // Update member
  async updateMember(id: string, memberData: MemberFormData): Promise<Member> {
    // Get existing member to preserve other fields
    const existingMember = await this.getMemberById(id);
    
    const updatedMember: Member = {
      ...existingMember,
      ...memberData,
    };

    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMember),
    });

    return handleResponse<Member>(response);
  },

  // Delete member
  async deleteMember(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to delete member: ${response.status} ${response.statusText}`,
        response.status
      );
    }
  },

  // Get member count
  async getMemberCount(): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/members`);
    const members = await handleResponse<Member[]>(response);
    return members.length;
  },
};

// Books API operations
export const bookService = {
  // Get all books
  async getAllBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`);
    return handleResponse<Book[]>(response);
  },

  // Get book by ID
  async getBookById(id: number): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse<Book>(response);
  },

  // Get multiple books by IDs
  async getBooksByIds(ids: number[]): Promise<Book[]> {
    const allBooks = await this.getAllBooks();
    return allBooks.filter(book => ids.includes(book.bookId));
  },
};