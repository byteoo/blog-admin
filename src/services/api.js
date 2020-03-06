import request from '@/utils/request';


// category
export async function queryCategory() {
  console.log('123456');
  return request(`/api/categories`);
}

export async function addCategory(params) {
  console.log(`parms${JSON.stringify(params)}`)
  return request('/api/categories', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function updateCategory(params) {
  console.log(`update`)
  return request('/api/categories', {
    method: 'PATCH',
    body: JSON.stringify(params),
  });
}

export async function delCategory(params) {
  return request(`/api/categories/${params}`, {
    method: 'DELETE',
  });
}
