import { Routes } from '../src/Routes';  // Adjust the import path as necessary

describe('Routes', () => {
    describe('fetchEntityMeta', () => {
        beforeEach(() => {
            // Mock the fetch function globally
            global.fetch = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();  // Restore all mocks after each test
        });

        it('should fetch entity metadata successfully', async () => {
            // Mock successful fetch response
            const mockData = { meta: 'mock meta data' };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockData),
            };
            (fetch as jest.Mock).mockResolvedValue(mockResponse);

            // Call the method
            const tableName = 'sampleTable';
            const result = await Routes.fetchEntityMeta(tableName);

            // Verify fetch call
            expect(fetch).toHaveBeenCalledWith(`/type/${tableName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verify result
            expect(result).toEqual(mockData);
        });

        it('should handle fetch error', async () => {
            // Mock error response
            const mockErrorResponse = {
                ok: false,
                status: 404,
                statusText: 'Not Found',
            };
            (fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

            // Mock console.error to capture logs
            const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

            // Call the method
            const tableName = 'nonExistentTable';
            const result = await Routes.fetchEntityMeta(tableName);

            // Verify fetch call
            expect(fetch).toHaveBeenCalledWith(`/type/${tableName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verify result (should be null on error)
            expect(result).toBeNull();

            // Verify console.error was called with expected message
            expect(consoleErrorMock).toHaveBeenCalledWith('Error:', expect.any(Error));

            // Restore console.error mock
            consoleErrorMock.mockRestore();
        });
    });
});