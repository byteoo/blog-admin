import request from '@/utils/request';

// category
export async function queryCategory() {
  console.log('123456');
  return request(`/api/categories`);
}

export async function addCategory(params) {
  return request('/api/addCategory', {
    method: 'POST',
    body: params,
  });
}

export async function updateCategory(params) {
  return request('/api/updateCategory', {
    method: 'POST',
    body: params,
  });
}

export async function delCategory(params) {
  return request('/api/delCategory', {
    method: 'POST',
    body: params,
  });
}
