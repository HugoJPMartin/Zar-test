import { gql } from '@apollo/client';
import { ParticipantProfile } from './participant-profiles.graphql-types';

export interface ParticipantProfilesQueryData {
    getParticipantProfiles: ParticipantProfile[];
}

export const PARTICIPANT_PROFILES_QUERY = gql`
    query GetParticipantProfiles($input: GetParticipantProfilesInput) {        
        getParticipantProfiles(input: $input) {
            summonerName
            championProfile{
                kda
                winrate
                gamesPlayed
            }            
            roleProfile{
                kda
                winrate
                gamesPlayed
            }
            queueProfile{
                winrate
                rank
                gamesPlayed
            }
        }
    }
`;